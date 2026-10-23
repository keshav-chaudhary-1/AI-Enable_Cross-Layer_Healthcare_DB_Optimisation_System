import { useCallback, useEffect, useState } from "react";
import { applyIndexRecommendationRequest, getOsDashboardRequest, getQueryDashboardRequest } from "../../api/developerApi.js";
import { getToken } from "../../utils/session.js";
import "./DeveloperDashboard.css";

const ms = (value) => value === null || value === undefined ? "Unavailable" : `${value} ms`;
const bytes = (value) => { if (!Number.isFinite(value)) return "Unavailable"; const units = ["B", "KB", "MB", "GB"]; let size = value; let index = 0; while (size >= 1024 && index < units.length - 1) { size /= 1024; index += 1; } return `${size.toFixed(index ? 1 : 0)} ${units[index]}`; };
const time = (value) => value ? new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "—";

function Metric({ label, value, tone = "" }) { return <div className={`console-metric ${tone}`}><span>{label}</span><strong>{value}</strong></div>; }

function QueryDetails({ query, token }) {
  const [message, setMessage] = useState("");
  const candidate = query.optimizer?.indexCandidates?.[0];
  async function approve() { try { const result = await applyIndexRecommendationRequest(token, { table: candidate.table, columns: candidate.columns }); setMessage(result.message); } catch (error) { setMessage(error.message); } }
  return <details className="console-details"><summary>Details</summary><div className="console-detail-body"><div className="console-detail-grid"><span>Route<strong>{query.route || "—"}</strong></span><span>Rows<strong>{query.rowCount ?? 0}</strong></span><span>Plan<strong>{query.optimization?.rootNode || "Not analysed"}</strong></span><span>Index<strong>{query.optimization?.usesIndex ? "Used" : "Not detected"}</strong></span></div><div className="console-advisory"><span>Advisory</span><strong>{query.optimization?.recommendation || "No plan advisory available."}</strong><b>Predicted {ms(query.optimizer?.model?.originalPredictedLatencyMs)} · Actual {ms(query.durationMs)}</b></div><pre>{query.sql}</pre>{candidate && <div className="console-action"><span>Suggested index: {candidate.table} ({candidate.columns.join(", ")})</span><button onClick={approve}>Approve index</button>{message && <small>{message}</small>}</div>}</div></details>;
}

function QueryView({ dashboard, error, onRefresh, token, onOpenLab }) {
  const queries = dashboard.queries || [];
  const summary = dashboard.summary || {};
  return <>
    <div className="console-toolbar"><div><h2>Query activity</h2><p>Latest database executions from MedChart workflows.</p></div><div><button onClick={onOpenLab}>Performance &amp; OS Lab</button><button onClick={onRefresh}>Refresh</button></div></div>
    <section className="console-metrics"><Metric label="Queries" value={summary.totalQueries ?? 0} /><Metric label="Average" value={`${summary.averageDurationMs ?? 0} ms`} /><Metric label="Failed" value={summary.failedQueries ?? 0} tone={summary.failedQueries ? "bad" : "good"} /><Metric label="Plans" value={summary.explainedQueries ?? 0} /></section>
    {error && <p className="console-error">{error}</p>}
    <section className="console-panel"><div className="console-panel-title"><h3>Recent executions</h3><span>{queries.length} recorded</span></div>{queries.length === 0 ? <p className="console-empty">No query activity yet.</p> : <div className="query-table"><div className="query-row query-head"><span>Time</span><span>Route</span><span>Duration</span><span>Status</span><span /></div>{queries.slice(0, 20).map((query) => <div className="query-row" key={query.id}><span>{time(query.timestamp)}</span><span className="query-route">{query.route || "Database operation"}</span><span>{ms(query.durationMs)}</span><span className={query.success ? "ok" : "bad-text"}>{query.success ? "Success" : "Failed"}</span><QueryDetails query={query} token={token} /></div>)}</div>}</section>
  </>;
}

function OsView({ metrics, queries, error, onRefresh }) {
  const cpu = metrics?.cpu; const memory = metrics?.memory; const process = metrics?.process; const health = metrics?.health || "unknown";
  const samples = queries.filter((query) => query.osRuntime).slice(0, 8);
  return <>
    <div className="console-toolbar"><div><h2>OS monitoring</h2><p>Current host and MedChart process measurements.</p></div><div><span className={`console-health ${health}`}>{health}</span><button onClick={onRefresh}>Refresh</button></div></div>
    {error && <p className="console-error">{error}</p>}
    <section className="console-metrics os-metrics"><Metric label="CPU" value={cpu?.utilizationPercent == null ? "Sampling" : `${cpu.utilizationPercent}%`} /><Metric label="Memory" value={memory ? `${memory.usedPercent}%` : "Unavailable"} /><Metric label="Process RSS" value={bytes(process?.rssBytes)} /><Metric label="Event loop" value={ms(metrics?.eventLoopDelayMs)} /></section>
    <section className="console-panel"><div className="console-panel-title"><h3>Runtime details</h3><span>{metrics?.host?.platform || "—"} · PID {process?.pid || "—"}</span></div><div className="runtime-grid"><span>Free memory<strong>{memory ? `${bytes(memory.freeBytes)} (${memory.freePercent}%)` : "Unavailable"}</strong></span><span>Load average<strong>{cpu?.loadAverage?.join(" · ") || "Unavailable"}</strong></span><span>Heap used<strong>{bytes(process?.heapUsedBytes)}</strong></span><span>Last sample<strong>{time(metrics?.timestamp)}</strong></span></div></section>
    <section className="console-panel"><div className="console-panel-title"><h3>Query resource samples</h3><span>{samples.length} sampled</span></div>{samples.length === 0 ? <p className="console-empty">Run healthcare workflows to capture process-level query samples.</p> : <div className="sample-list">{samples.map((query) => <div key={query.id}><span>{query.route || "Database operation"}</span><strong>{ms(query.osRuntime.databaseExecutionMs)}</strong><small>CPU {ms((query.osRuntime.processCpuUserMs || 0) + (query.osRuntime.processCpuSystemMs || 0))} · RSS {bytes(query.osRuntime.rssDeltaBytes)}</small><em>{query.optimization?.recommendation || "No plan advisory available."}</em><b>Predicted {ms(query.optimizer?.model?.originalPredictedLatencyMs)} · Actual {ms(query.durationMs)}</b></div>)}</div>}</section>
  </>;
}

export default function DeveloperDashboard({ user, onLogout, onOpenLab }) {
  const [mode, setMode] = useState("query"); const [dashboard, setDashboard] = useState({ summary: {}, queries: [] }); const [metrics, setMetrics] = useState(null); const [error, setError] = useState(""); const token = getToken();
  const refreshQueries = useCallback(async () => { try { setDashboard(await getQueryDashboardRequest(token)); setError(""); } catch (err) { setError(err.message); } }, [token]);
  const refreshOs = useCallback(async () => { try { setMetrics(await getOsDashboardRequest(token)); setError(""); } catch (err) { setError(err.message); } }, [token]);
  useEffect(() => { refreshQueries(); const timer = window.setInterval(refreshQueries, 5000); return () => window.clearInterval(timer); }, [refreshQueries]);
  useEffect(() => { if (mode !== "os") return undefined; refreshOs(); const timer = window.setInterval(refreshOs, 5000); return () => window.clearInterval(timer); }, [mode, refreshOs]);
  return <div className="console-shell"><header className="console-header"><div><span className="console-kicker">MedChart · developer console</span><h1>{mode === "query" ? "Database activity" : "OS monitoring"}</h1></div><div className="console-header-actions"><button className={mode === "query" ? "selected" : ""} onClick={() => setMode("query")}>Queries</button><button className={mode === "os" ? "selected" : ""} onClick={() => setMode("os")}>OS monitor</button><span className="console-user">{user.email}</span><button onClick={onLogout}>Log out</button></div></header><main className="console-main">{mode === "query" ? <QueryView dashboard={dashboard} error={error} onRefresh={refreshQueries} token={token} onOpenLab={onOpenLab} /> : <OsView metrics={metrics} queries={dashboard.queries} error={error} onRefresh={refreshOs} />}</main></div>;
}
