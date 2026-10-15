import pg from "pg";
import dotenv from "dotenv";
import { getQueryContext, recordQuery } from "./utils/queryLogger.js";
import { analyzeCandidates } from "./utils/queryOptimizer.js";
import { chooseModelRewrite, extractQueryFeatures, modelStatus, observeLatency, predictLatencyMs } from "./utils/queryModel.js";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const nativeQuery = pool.query.bind(pool);

function getPlanNode(plan) {
  let node = plan;
  while (node?.Plans?.length) node = node.Plans[0];
  return node || plan;
}

function buildOptimization(plan) {
  const root = plan?.Plan || plan;
  const node = getPlanNode(root);
  const nodeTypes = [];
  const walk = (current) => {
    if (!current) return;
    if (current["Node Type"]) nodeTypes.push(current["Node Type"]);
    current.Plans?.forEach(walk);
  };
  walk(root);
  const usesIndex = nodeTypes.some((type) => type.includes("Index"));
  const relation = node["Relation Name"] || root["Relation Name"] || null;
  const estimateRows = node["Plan Rows"] ?? root["Plan Rows"] ?? 0;
  let recommendation = "Plan is using the available access paths.";
  if (nodeTypes.includes("Seq Scan") && estimateRows > 50) {
    recommendation = `Sequential scan on ${relation || "a relation"}; inspect filter/join columns and consider a composite index.`;
  } else if (nodeTypes.includes("Seq Scan")) {
    recommendation = `Sequential scan on ${relation || "a small relation"} is currently reasonable because the estimated cardinality is low.`;
  } else if (usesIndex) {
    recommendation = "Index access path detected; compare this plan against execution time and returned cardinality.";
  }
  return {
    available: true,
    rootNode: root["Node Type"] || "Unknown",
    nodeTypes,
    relation,
    estimatedCost: Number((root["Total Cost"] || 0).toFixed(2)),
    estimatedRows: estimateRows,
    usesIndex,
    recommendation,
  };
}

function readProcessMemory() {
  const memory = process.memoryUsage();
  return { rssBytes: memory.rss, heapUsedBytes: memory.heapUsed, externalBytes: memory.external };
}

function buildOsRuntime(startedAt, cpuStart, memoryStart, databaseStartedAt, databaseCpuStart) {
  const processCpu = process.cpuUsage(cpuStart);
  const databaseCpu = databaseCpuStart ? process.cpuUsage(databaseCpuStart) : { user: 0, system: 0 };
  const memoryEnd = readProcessMemory();
  return {
    wallClockMs: Number((performance.now() - startedAt).toFixed(2)),
    databaseExecutionMs: databaseStartedAt ? Number((performance.now() - databaseStartedAt).toFixed(2)) : null,
    processCpuUserMs: Number((processCpu.user / 1000).toFixed(2)),
    processCpuSystemMs: Number((processCpu.system / 1000).toFixed(2)),
    databaseCpuUserMs: Number((databaseCpu.user / 1000).toFixed(2)),
    databaseCpuSystemMs: Number((databaseCpu.system / 1000).toFixed(2)),
    rssBeforeBytes: memoryStart.rssBytes,
    rssAfterBytes: memoryEnd.rssBytes,
    rssDeltaBytes: memoryEnd.rssBytes - memoryStart.rssBytes,
    heapUsedAfterBytes: memoryEnd.heapUsedBytes,
    externalAfterBytes: memoryEnd.externalBytes,
  };
}

pool.query = async (...args) => {
  const queryConfig = typeof args[0] === "string" ? { text: args[0], values: args[1] || [] } : args[0];
  const startedAt = performance.now();
  const cpuStart = process.cpuUsage();
  const memoryStart = readProcessMemory();
  try {
    let executionArgs = args;
    let optimizer = { enabled: false, candidates: [], indexCandidates: [], selectedRewrite: null, model: modelStatus() };
    const activeRewrite = process.env.ENABLE_ACTIVE_QUERY_REWRITE === "true";
    const aiOptimizerEnabled = process.env.ENABLE_AI_QUERY_OPTIMIZER === "true";
    if (/^\s*SELECT\b/i.test(queryConfig?.text || "") && process.env.ENABLE_QUERY_EXPLAIN !== "false") {
      const decisionStartedAt = performance.now();
      try {
        const basePlanResult = await nativeQuery({ text: `EXPLAIN (FORMAT JSON, COSTS TRUE) ${queryConfig.text}`, values: queryConfig.values || [] });
        const basePlan = basePlanResult.rows[0]?.["QUERY PLAN"]?.[0]?.Plan;
        optimizer = { enabled: true, ...(await analyzeCandidates(nativeQuery, queryConfig)) };
        const basePlanSummary = buildOptimization(basePlan);
        const originalFeatures = extractQueryFeatures(queryConfig.text, {
          cost: basePlanSummary.estimatedCost,
          rows: basePlanSummary.estimatedRows,
          nodeTypes: basePlanSummary.nodeTypes,
        });
        const originalPredictedLatencyMs = predictLatencyMs(originalFeatures);
        optimizer.model = { ...modelStatus(), originalPredictedLatencyMs };
        optimizer.candidates = optimizer.candidates.map((candidate) => {
          const candidateFeatures = extractQueryFeatures(candidate.sql, candidate.plan || {});
          return { ...candidate, predictedLatencyMs: predictLatencyMs(candidateFeatures), modelFeatures: candidateFeatures };
        });
        const selectedRewrite = activeRewrite && aiOptimizerEnabled
          ? chooseModelRewrite({ predictedLatencyMs: originalPredictedLatencyMs }, optimizer.candidates)
          : null;
        optimizer.selectedRewrite = selectedRewrite?.sql || null;
        optimizer.selectedCandidate = selectedRewrite || null;
        optimizer.decisionTimeMs = Number((performance.now() - decisionStartedAt).toFixed(2));
        if (selectedRewrite) executionArgs = [{ ...queryConfig, text: selectedRewrite.sql }];
      } catch (optimizerError) {
        optimizer = { enabled: true, candidates: [], indexCandidates: [], selectedRewrite: null, model: modelStatus(), decisionTimeMs: Number((performance.now() - decisionStartedAt).toFixed(2)), error: optimizerError.code || optimizerError.message };
      }
    }
    const databaseStartedAt = performance.now();
    const databaseCpuStart = process.cpuUsage();
    const result = await nativeQuery(...executionArgs);
    const osRuntime = buildOsRuntime(startedAt, cpuStart, memoryStart, databaseStartedAt, databaseCpuStart);
    const durationMs = Number((performance.now() - startedAt).toFixed(2));
    if (optimizer.enabled && optimizer.model?.available) {
      const executedSql = executionArgs[0]?.text || queryConfig.text;
      const executedCandidate = optimizer.candidates.find((candidate) => candidate.sql === executedSql);
      const executedPlan = executedCandidate?.plan || {};
      observeLatency(extractQueryFeatures(executedSql, executedPlan), durationMs);
      optimizer.model = { ...modelStatus(), originalPredictedLatencyMs: optimizer.model.originalPredictedLatencyMs ?? null };
    }
    let optimization = { available: false, recommendation: "Execution plan is available for SELECT statements only." };
    if (/^\s*SELECT\b/i.test(queryConfig?.text || "") && process.env.ENABLE_QUERY_EXPLAIN !== "false") {
      try {
        const explainResult = await nativeQuery({ text: `EXPLAIN (FORMAT JSON, COSTS TRUE) ${queryConfig.text}`, values: queryConfig.values || [] });
        const plan = explainResult.rows[0]?.["QUERY PLAN"]?.[0];
        optimization = buildOptimization(plan);
      } catch (explainError) {
        optimization = { available: false, recommendation: `Plan analysis unavailable: ${explainError.code || explainError.message}` };
      }
    }
    recordQuery({ sql: queryConfig?.text || "unknown query", parameterCount: queryConfig?.values?.length || 0, durationMs, rowCount: result.rowCount ?? result.rows?.length ?? 0, success: true, route: getQueryContext().route || "unknown", actor: getQueryContext().actor || "anonymous", optimization, optimizer, osRuntime, replayValues: queryConfig?.values || [] });
    return result;
  } catch (error) {
    recordQuery({ sql: queryConfig?.text || "unknown query", parameterCount: queryConfig?.values?.length || 0, durationMs: Number((performance.now() - startedAt).toFixed(2)), rowCount: 0, success: false, error: error.code || error.message, route: getQueryContext().route || "unknown", actor: getQueryContext().actor || "anonymous", osRuntime: buildOsRuntime(startedAt, cpuStart, memoryStart, null, null) });
    throw error;
  }
};

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err);
});
