const SAFE_PROJECTIONS = {
  patient: ["patient_id", "patient_name", "date_of_birth", "gender", "blood_group", "phone", "email", "password_hash", "created_at"],
  doctor: ["doctor_id", "doctor_name", "specialization", "department_id", "email", "password_hash", "created_at"],
  department: ["department_id", "department_name"],
};

function isSelect(sql) {
  return /^\s*SELECT\b/i.test(sql || "") && !/\bFOR\s+(UPDATE|SHARE)\b/i.test(sql || "");
}

function explainPlan(explainResult) {
  return explainResult.rows[0]?.["QUERY PLAN"]?.[0]?.Plan || null;
}

function planCost(plan) {
  return Number(plan?.["Total Cost"] || 0);
}

function walkPlan(plan, callback) {
  if (!plan) return;
  callback(plan);
  plan.Plans?.forEach((child) => walkPlan(child, callback));
}

function summarizePlan(plan) {
  const nodes = [];
  walkPlan(plan, (node) => nodes.push(node["Node Type"]));
  return {
    cost: Number(planCost(plan).toFixed(2)),
    rows: plan?.["Plan Rows"] ?? 0,
    rootNode: plan?.["Node Type"] || "Unknown",
    nodeTypes: nodes,
    usesIndex: nodes.some((type) => type?.includes("Index")),
  };
}

function candidateForKnownProjection(sql) {
  const match = sql.match(/^\s*SELECT\s+\*\s+FROM\s+(patient|doctor|department)(\s+.*)?$/is);
  if (!match) return null;
  const table = match[1].toLowerCase();
  const suffix = match[2] || "";
  return {
    kind: "explicit_projection",
    sql: `SELECT ${SAFE_PROJECTIONS[table].join(", ")} FROM ${table}${suffix}`,
    explanation: `Replaces SELECT * with the known ${table} columns so the selected payload is explicit and stable.`,
    safety: "safe_for_medchart_schema",
  };
}

export function buildRewriteCandidates(sql) {
  if (!isSelect(sql)) return [];
  const candidates = [];
  const projection = candidateForKnownProjection(sql);
  if (projection && projection.sql.trim() !== sql.trim()) candidates.push(projection);
  return candidates;
}

export function extractIndexCandidates(sql) {
  if (!isSelect(sql)) return [];
  const candidates = [];
  const from = sql.match(/\bFROM\s+([a-z_][a-z0-9_]*)/i)?.[1];
  const where = sql.match(/\bWHERE\s+([\s\S]*?)(?:\bGROUP\s+BY\b|\bORDER\s+BY\b|\bLIMIT\b|$)/i)?.[1] || "";
  const equalityColumns = [...where.matchAll(/(?:\b([a-z_][a-z0-9_]*)\.)?([a-z_][a-z0-9_]*)\s*=\s*\$\d+/gi)]
    .map((match) => match[2].toLowerCase());
  if (from && equalityColumns.length) {
    const uniqueColumns = [...new Set(equalityColumns)];
    const safeTable = from.toLowerCase();
    if (/^[a-z_][a-z0-9_]*$/.test(safeTable) && uniqueColumns.every((column) => /^[a-z_][a-z0-9_]*$/.test(column))) {
      candidates.push({
        kind: "index",
        table: safeTable,
        columns: uniqueColumns,
        name: `idx_optimizer_${safeTable}_${uniqueColumns.join("_")}`,
        explanation: `Equality predicates on ${uniqueColumns.join(", ")} may benefit from a composite index.`,
        safety: "requires_developer_approval",
      });
    }
  }
  return candidates;
}

export async function analyzeCandidates(nativeQuery, query) {
  if (!isSelect(query.text)) return { candidates: [], indexCandidates: [] };
  const rewriteCandidates = buildRewriteCandidates(query.text);
  const candidates = [];
  for (const candidate of rewriteCandidates) {
    try {
      const result = await nativeQuery({
        text: `EXPLAIN (FORMAT JSON, COSTS TRUE) ${candidate.sql}`,
        values: query.values || [],
      });
      const plan = explainPlan(result);
      candidates.push({ ...candidate, plan: summarizePlan(plan), betterThanOriginal: false });
    } catch (error) {
      candidates.push({ ...candidate, error: error.code || error.message, betterThanOriginal: false });
    }
  }
  return { candidates, indexCandidates: extractIndexCandidates(query.text) };
}

export function selectWinningRewrite(originalPlan, candidates) {
  const originalCost = planCost(originalPlan);
  return candidates
    .filter((candidate) => candidate.plan && candidate.plan.cost < originalCost)
    .sort((a, b) => a.plan.cost - b.plan.cost)[0] || null;
}

export function quoteIdentifier(identifier) {
  if (!/^[a-z_][a-z0-9_]*$/i.test(identifier)) throw new Error("Unsafe SQL identifier.");
  return `"${identifier}"`;
}
