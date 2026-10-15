import { AsyncLocalStorage } from "node:async_hooks";

export const queryContext = new AsyncLocalStorage();
const queryLog = [];
const replayValues = new Map();
const MAX_LOG_ENTRIES = 250;

export function runWithQueryContext(metadata, callback) {
  return queryContext.run({ ...metadata }, callback);
}

export function getQueryContext() {
  return queryContext.getStore() || {};
}

export function recordQuery(entry) {
  const { replayValues: privateReplayValues, ...publicEntry } = entry;
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  queryLog.unshift({ id, timestamp: new Date().toISOString(), ...publicEntry });
  if (Array.isArray(privateReplayValues)) replayValues.set(id, privateReplayValues);
  if (queryLog.length > MAX_LOG_ENTRIES) queryLog.length = MAX_LOG_ENTRIES;
  while (replayValues.size > MAX_LOG_ENTRIES) replayValues.delete(replayValues.keys().next().value);
}

export function getQueryLog() {
  return queryLog;
}

export function getQuerySummary() {
  const total = queryLog.length;
  const successful = queryLog.filter((query) => query.success).length;
  const totalDurationMs = queryLog.reduce((sum, query) => sum + query.durationMs, 0);
  return {
    totalQueries: total,
    successfulQueries: successful,
    failedQueries: total - successful,
    averageDurationMs: total ? Number((totalDurationMs / total).toFixed(2)) : 0,
    totalDurationMs: Number(totalDurationMs.toFixed(2)),
    explainedQueries: queryLog.filter((query) => query.optimization?.available).length,
    optimizedPlanQueries: queryLog.filter((query) => query.optimization?.usesIndex).length,
    candidateQueries: queryLog.filter((query) => query.optimizer?.candidates?.length).length,
    rewriteCandidates: queryLog.reduce((sum, query) => sum + (query.optimizer?.candidates?.length || 0), 0),
    slowest: [...queryLog].sort((a, b) => b.durationMs - a.durationMs).slice(0, 5),
  };
}

export function getReplayValues(id) {
  return replayValues.get(id);
}
