import fs from "node:fs";
import path from "node:path";

const MODEL_PATH = process.env.QUERY_MODEL_PATH || path.join(process.cwd(), ".data", "query-latency-model.json");
const FEATURE_NAMES = [
  "bias", "sqlLength", "joins", "predicates", "selectedColumns", "estimatedCost",
  "estimatedRows", "sequentialScans", "indexScans", "hasSort", "hasAggregate", "hasJoin",
];
const MIN_OBSERVATIONS_FOR_REWRITE = 20;
const MIN_IMPROVEMENT_RATIO = 0.1;

let state = loadModel();

function defaultState() {
  return {
    version: 1,
    algorithm: "online-log-linear-regression",
    observations: 0,
    learningRate: 0.08,
    weights: Object.fromEntries(FEATURE_NAMES.map((name, index) => [name, index === 0 ? Math.log(10) : 0])),
    totalAbsoluteErrorMs: 0,
    totalSquaredErrorMs: 0,
    lastPredictionMs: null,
    lastActualMs: null,
    lastAbsoluteErrorMs: null,
    updatedAt: null,
  };
}

function loadModel() {
  try {
    const parsed = JSON.parse(fs.readFileSync(MODEL_PATH, "utf8"));
    if (parsed?.version === 1 && parsed.weights) return parsed;
  } catch {
    // A first run starts with a cold model.
  }
  return defaultState();
}

function persistModel() {
  try {
    fs.mkdirSync(path.dirname(MODEL_PATH), { recursive: true });
    fs.writeFileSync(MODEL_PATH, JSON.stringify(state, null, 2));
  } catch {
    // Model persistence must never break a healthcare query.
  }
}

function countMatches(sql, pattern) {
  return (sql.match(pattern) || []).length;
}

export function extractQueryFeatures(sql, plan = {}) {
  const text = String(sql || "");
  const nodeTypes = plan.nodeTypes || [];
  return {
    bias: 1,
    sqlLength: Math.min(text.length / 1000, 10),
    joins: countMatches(text, /\bJOIN\b/gi),
    predicates: countMatches(text, /\b(WHERE|AND|OR|ON)\b/gi),
    selectedColumns: text.match(/^\s*SELECT\s+([\s\S]*?)\s+FROM\b/i)?.[1]?.split(",").length || 1,
    estimatedCost: Math.min(Math.log1p(Number(plan.cost || plan.estimatedCost || 0)) / 10, 10),
    estimatedRows: Math.min(Math.log1p(Number(plan.rows || plan.estimatedRows || 0)) / 10, 10),
    sequentialScans: nodeTypes.filter((node) => node === "Seq Scan").length,
    indexScans: nodeTypes.filter((node) => node?.includes("Index")).length,
    hasSort: nodeTypes.includes("Sort") ? 1 : 0,
    hasAggregate: nodeTypes.some((node) => node?.includes("Aggregate")) ? 1 : 0,
    hasJoin: nodeTypes.some((node) => node?.includes("Join")) ? 1 : 0,
  };
}

export function predictLatencyMs(features) {
  const score = FEATURE_NAMES.reduce((sum, name) => sum + (state.weights[name] || 0) * Number(features[name] || 0), 0);
  return Number(Math.max(0.1, Math.min(Math.expm1(score), 60000)).toFixed(2));
}

export function observeLatency(features, durationMs) {
  const actual = Math.max(0.1, Number(durationMs) || 0.1);
  const predictionMs = predictLatencyMs(features);
  const predictionLog = Math.log1p(predictionMs);
  const error = Math.log1p(actual) - predictionLog;
  const rate = state.learningRate / (1 + state.observations * 0.01);
  FEATURE_NAMES.forEach((name) => {
    state.weights[name] = Number(((state.weights[name] || 0) + rate * error * Number(features[name] || 0)).toFixed(8));
  });
  state.observations += 1;
  const absoluteErrorMs = Math.abs(actual - predictionMs);
  state.totalAbsoluteErrorMs = Number((Number(state.totalAbsoluteErrorMs || 0) + absoluteErrorMs).toFixed(4));
  state.totalSquaredErrorMs = Number((Number(state.totalSquaredErrorMs || 0) + (actual - predictionMs) ** 2).toFixed(4));
  state.lastPredictionMs = predictionMs;
  state.lastActualMs = Number(actual.toFixed(2));
  state.lastAbsoluteErrorMs = Number(absoluteErrorMs.toFixed(2));
  state.updatedAt = new Date().toISOString();
  persistModel();
}

export function modelStatus() {
  return {
    available: true,
    algorithm: state.algorithm,
    observations: state.observations,
    readyForRewrite: state.observations >= MIN_OBSERVATIONS_FOR_REWRITE,
    minimumObservationsForRewrite: MIN_OBSERVATIONS_FOR_REWRITE,
    minimumImprovementRatio: MIN_IMPROVEMENT_RATIO,
    meanAbsoluteErrorMs: state.observations ? Number((Number(state.totalAbsoluteErrorMs || 0) / state.observations).toFixed(2)) : null,
    lastPredictionMs: state.lastPredictionMs ?? null,
    lastActualMs: state.lastActualMs ?? null,
    lastAbsoluteErrorMs: state.lastAbsoluteErrorMs ?? null,
    featureNames: FEATURE_NAMES.filter((name) => name !== "bias"),
    updatedAt: state.updatedAt,
  };
}

export function chooseModelRewrite(original, candidates) {
  if (!modelStatus().readyForRewrite || !original) return null;
  const winner = candidates
    .filter((candidate) => Number.isFinite(candidate.predictedLatencyMs))
    .sort((a, b) => a.predictedLatencyMs - b.predictedLatencyMs)[0];
  if (!winner) return null;
  const improvement = (original.predictedLatencyMs - winner.predictedLatencyMs) / Math.max(original.predictedLatencyMs, 0.1);
  return improvement >= MIN_IMPROVEMENT_RATIO ? { ...winner, predictedImprovementRatio: Number(improvement.toFixed(4)) } : null;
}
