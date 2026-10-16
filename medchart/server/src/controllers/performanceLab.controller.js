import { clearLabHistory, executeLab, getLabHistory, getLabStatus } from "../utils/performanceLab.js";
import { pool } from "../db.js";

const modules = [
  { id: "sql", label: "SQL optimisation", concept: "EXPLAIN ANALYZE, indexes, scans and aggregation" },
  { id: "deadlock", label: "Deadlock detection", concept: "Two-phase locking and PostgreSQL SQLSTATE 40P01" },
  { id: "transactions", label: "ACID & recovery", concept: "Atomicity, consistency, isolation and durability" },
  { id: "threads", label: "Worker threads", concept: "Real CPU-bound multithreading" },
  { id: "processes", label: "Processes", concept: "Separate OS processes and measured concurrency" },
  { id: "scheduling", label: "Scheduling simulator", concept: "FCFS, SJF, priority and Round Robin metrics" },
  { id: "sync", label: "Synchronisation", concept: "Race condition and critical-section protection" },
  { id: "paging", label: "Virtual memory", concept: "Bounded file-backed page access" },
  { id: "monitoring", label: "OS monitoring", concept: "Host and process resource measurements" },
  { id: "ml", label: "ML prediction", concept: "Evaluation from collected benchmark samples" },
];

export function labOverview(req, res) { res.json({ modules, status: getLabStatus() }); }
export function labHistory(req, res) { res.json({ history: getLabHistory() }); }
export async function runLab(req, res, next) { try { const module = String(req.body?.module || ""); if (!modules.some((item) => item.id === module)) return res.status(400).json({ message: "Choose a supported lab module." }); const result = await executeLab(module, req.body?.config || {}, pool); res.json(result); } catch (error) { if (error.labResult) return res.status(error.status === 429 ? 429 : 500).json(error.labResult); if (error.status === 429) return res.status(429).json({ message: error.message }); next(error); } }
export function resetLab(req, res) { clearLabHistory(); res.json({ status: "ready", message: "Bounded lab history cleared." }); }
