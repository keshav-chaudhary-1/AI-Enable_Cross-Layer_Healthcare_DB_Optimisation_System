import os from "node:os";
import { getQueryLog, getQuerySummary, getReplayValues } from "../utils/queryLogger.js";
import { pool } from "../db.js";
import { quoteIdentifier } from "../utils/queryOptimizer.js";

let previousCpuSample = null;

function readCpuSample() {
  return os.cpus().reduce((total, cpu) => {
    const times = cpu.times;
    return {
      idle: total.idle + times.idle,
      total: total.total + times.user + times.nice + times.sys + times.irq + times.idle,
    };
  }, { idle: 0, total: 0 });
}

function getCpuUtilization() {
  const current = readCpuSample();
  const previous = previousCpuSample;
  previousCpuSample = current;
  if (!previous) return null;
  const totalDelta = current.total - previous.total;
  const idleDelta = current.idle - previous.idle;
  return totalDelta > 0 ? Number(((1 - idleDelta / totalDelta) * 100).toFixed(1)) : null;
}

export function requireDeveloper(req, res, next) {
  if (req.userRole !== "developer") return res.status(403).json({ message: "Developer access required." });
  next();
}

export function queryDashboard(req, res) {
  res.json({ summary: getQuerySummary(), queries: getQueryLog() });
}

export async function osDashboard(req, res) {
  const startedAt = performance.now();
  await new Promise((resolve) => setImmediate(resolve));
  const eventLoopDelayMs = Number((performance.now() - startedAt).toFixed(2));
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const processMemory = process.memoryUsage();
  const loadAverage = os.loadavg();
  const networkInterfaces = Object.values(os.networkInterfaces()).flat().filter(Boolean);
  const cpuUtilizationPercent = getCpuUtilization();
  const memoryUsedPercent = Number((((totalMemory - freeMemory) / totalMemory) * 100).toFixed(1));
  const health = cpuUtilizationPercent !== null && cpuUtilizationPercent >= 90 || memoryUsedPercent >= 90 || eventLoopDelayMs >= 100
    ? "attention"
    : cpuUtilizationPercent !== null && cpuUtilizationPercent >= 70 || memoryUsedPercent >= 75 || eventLoopDelayMs >= 25
      ? "watch"
      : "healthy";
  res.json({
    timestamp: new Date().toISOString(),
    host: {
      platform: os.platform(),
      architecture: os.arch(),
      cpuModel: cpus[0]?.model || "Unknown",
      cpuCores: cpus.length,
      nodeVersion: process.version,
    },
    cpu: {
      loadAverage: loadAverage.map((value) => Number(value.toFixed(2))),
      loadPercent: cpus.length ? Number(Math.min((loadAverage[0] / cpus.length) * 100, 100).toFixed(1)) : 0,
      utilizationPercent: cpuUtilizationPercent,
    },
    memory: {
      totalBytes: totalMemory,
      freeBytes: freeMemory,
      usedBytes: totalMemory - freeMemory,
      usedPercent: memoryUsedPercent,
      freePercent: Number((100 - memoryUsedPercent).toFixed(1)),
    },
    process: {
      uptimeSeconds: Number(process.uptime().toFixed(1)),
      rssBytes: processMemory.rss,
      heapUsedBytes: processMemory.heapUsed,
      heapTotalBytes: processMemory.heapTotal,
      externalBytes: processMemory.external,
      pid: process.pid,
    },
    network: {
      interfaceCount: Object.keys(os.networkInterfaces()).length,
      addressCount: networkInterfaces.length,
      activeAddressCount: networkInterfaces.filter((entry) => !entry.internal).length,
    },
    health,
    eventLoopDelayMs,
  });
}

export function queryAnalysis(req, res) {
  const query = getQueryLog().find((entry) => entry.id === req.params.queryId);
  if (!query) return res.status(404).json({ message: "Query execution is no longer in the in-memory console." });
  res.json({ query, replayAvailable: Boolean(getReplayValues(query.id)) });
}

export async function applyIndexRecommendation(req, res, next) {
  try {
    const table = String(req.body?.table || "").toLowerCase();
    const columns = Array.isArray(req.body?.columns) ? req.body.columns.map((column) => String(column).toLowerCase()) : [];
    const allowedTables = new Set(["patient", "doctor", "department", "appointment", "report_document"]);
    if (!allowedTables.has(table) || columns.length === 0 || columns.length > 3 || columns.some((column) => !/^[a-z_][a-z0-9_]*$/i.test(column))) {
      return res.status(400).json({ message: "Only valid MedChart table and column names may be indexed." });
    }
    const columnResult = await pool.query({
      text: "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 AND column_name = ANY($2::text[])",
      values: [table, columns],
    });
    const found = new Set(columnResult.rows.map((row) => row.column_name));
    if (columns.some((column) => !found.has(column))) return res.status(400).json({ message: "One or more columns do not exist on the selected table." });
    const indexName = `idx_optimizer_${table}_${columns.join("_")}`.slice(0,  sixtyFour());
    const sql = `CREATE INDEX IF NOT EXISTS ${quoteIdentifier(indexName)} ON ${quoteIdentifier(table)} (${columns.map(quoteIdentifier).join(", ")})`;
    await pool.query(sql);
    res.json({ message: "Index applied after developer approval.", indexName, table, columns });
  } catch (error) {
    next(error);
  }
}

function sixtyFour() {
  return 63;
}
