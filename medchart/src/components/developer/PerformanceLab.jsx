import { useEffect, useMemo, useState } from "react";
import { getLabHistoryRequest, getLabOverviewRequest, resetLabRequest, runLabRequest } from "../../api/performanceLabApi.js";
import { getToken } from "../../utils/session.js";
import "./PerformanceLab.css";

const descriptions = {
  sql: "Runs a synthetic PostgreSQL benchmark and compares EXPLAIN ANALYZE before and after an isolated index.",
  deadlock: "Uses two real PostgreSQL connections and opposite row-lock ordering; only isolated experiment rows are touched.",
  transactions: "Demonstrates rollback, constraints and durability using dedicated experiment tables.",
  threads: "Compares deterministic CPU work in the main thread and real worker_threads.",
  processes: "Spawns separate Node.js processes and measures sequential versus concurrent execution.",
  scheduling: "Calculates waiting, turnaround and response metrics for four scheduling policies.",
  sync: "Creates a controlled lost-update workload, then protects the critical section with a promise mutex.",
  paging: "Reads a bounded synthetic file in page-sized steps and reports supported access measurements.",
  monitoring: "Samples host CPU/load, memory and process state without fabricating unavailable disk counters.",
  ml: "Evaluates only collected SQL lab samples; it reports insufficient data instead of inventing accuracy.",
};

const groups = [
  { id: "dbms", label: "DBMS experiments", hint: "PostgreSQL execution and transactions", modules: ["sql", "deadlock", "transactions"] },
  { id: "os", label: "OS experiments", hint: "Processes, memory, scheduling and synchronisation", modules: ["threads", "processes", "scheduling", "sync", "paging", "monitoring"] },
  { id: "ai", label: "AI evaluation", hint: "Measured query-latency prediction", modules: ["ml"] },
];

function pretty(value) { return typeof value === "string" ? value : JSON.stringify(value, null, 2); }

function ResultCard({ result }) {
  return <article className="lab-result">
    <div className="lab-result-head"><div><p className="lab-label">Measured output</p><h3>{result.title}</h3></div><span className={`lab-result-status ${result.status}`}>{result.status}</span></div>
    <div className="lab-summary"><span>Experiment ID<strong>{result.id || "—"}</strong></span><span>Started<strong>{result.startedAt ? new Date(result.startedAt).toLocaleTimeString() : "—"}</strong></span><span>Finished<strong>{result.finishedAt ? new Date(result.finishedAt).toLocaleTimeString() : "—"}</strong></span></div>
    {result.explanation && <p className="lab-explanation">{result.explanation}</p>}
    <details><summary>Technical details</summary><pre>{pretty(result)}</pre></details>
  </article>;
}

export default function PerformanceLab({ onBack, onLogout }) {
  const [overview, setOverview] = useState(null);
  const [selected, setSelected] = useState("monitoring");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const token = getToken();

  useEffect(() => {
    Promise.all([getLabOverviewRequest(token), getLabHistoryRequest(token)])
      .then(([lab, recent]) => { setOverview(lab); setHistory(recent.history || []); })
      .catch((err) => setError(err.message));
  }, [token]);

  const currentModule = useMemo(() => overview?.modules?.find((item) => item.id === selected), [overview, selected]);
  const currentGroup = groups.find((group) => group.modules.includes(selected));

  async function run() {
    setBusy(true); setError("");
    try {
      const config = selected === "sql" ? { rows: 1000 } : selected === "threads" ? { workers: Math.min(4, navigator.hardwareConcurrency || 2) } : {};
      const value = await runLabRequest(token, selected, config);
      setResult(value); setHistory((items) => [value, ...items].slice(0, 10));
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  async function reset() { await resetLabRequest(token); setResult(null); setHistory([]); setError(""); }
  function selectModule(id) { setSelected(id); setResult(null); setError(""); }

  return <div className="lab-shell">
    <header className="lab-header"><div><p className="lab-kicker">MedChart · developer area</p><h1>Performance &amp; OS Lab</h1></div><div className="lab-actions"><button onClick={onBack}>Query console</button><button onClick={onLogout}>Log out</button></div></header>
    <main className="lab-main">
      <aside className="lab-nav"><p className="lab-label">Modules</p>{groups.map((group) => <section className={`lab-nav-group ${group.id === "os" ? "is-os" : ""}`} key={group.id}><div className="lab-group-heading"><strong>{group.label}</strong></div>{group.modules.map((id) => { const item = overview?.modules?.find((module) => module.id === id); return <button key={id} className={id === selected ? "active" : ""} onClick={() => selectModule(id)}><span className="lab-module-dot" /><span><strong>{item?.label || id}</strong></span></button>; })}</section>)}</aside>
      <section className="lab-content">
        <div className={`lab-intro ${currentGroup?.id === "os" ? "is-os-intro" : ""}`}><div className="lab-intro-top"><div><p className="lab-label">{currentGroup?.label || "Experiment"}</p><h2>{currentModule?.label || "Performance experiment"}</h2></div><span className="lab-status"><i />{busy ? "Running" : "Ready"}</span></div><p>{descriptions[selected]}</p><div className="lab-controls"><button className="lab-run" disabled={busy || !currentModule} onClick={run}>{busy ? "Executing…" : "Run experiment"}</button><button disabled={busy} onClick={reset}>Reset history</button></div></div>
        {currentGroup?.id === "os" && <div className="lab-os-strip"><div><span className="lab-os-icon">OS</span><strong>Operating-system experiment</strong></div><span className="lab-os-count">Measured output</span></div>}
        {error && <div className="lab-error">{error}</div>}
        {result && <ResultCard result={result} />}
        <article className="lab-history"><div className="lab-result-head"><div><p className="lab-label">Bounded history</p><h3>Recent executions</h3></div><span>{history.length} retained</span></div>{history.length === 0 ? <p className="lab-muted">No experiments have been executed in this server session.</p> : <div className="lab-history-list">{history.map((item) => <button key={item.id} onClick={() => setResult(item)}><span>{item.module}</span><strong>{item.status}</strong><small>{new Date(item.finishedAt || item.startedAt).toLocaleString()}</small></button>)}</div>}</article>
        <p className="lab-footnote">Synthetic records only · unsupported metrics are marked unavailable.</p>
      </section>
    </main>
  </div>;
}
