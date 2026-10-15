import { useCallback, useEffect, useState } from "react";
import { getToken } from "../../utils/session.js";
import { applyIndexRecommendationRequest, getOsDashboardRequest, getQueryDashboardRequest } from "../../api/developerApi.js";
import "./DeveloperDashboard.css";

function formatSql(sql) {
  return sql
    .replace(/\s+/g, " ")
    .replace(/\b(SELECT|FROM|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|WHERE|GROUP BY|ORDER BY|HAVING|VALUES|SET|RETURNING)\b/gi, "\n$1")
    .replace(/\s+(AND|OR)\s+/gi, "\n  $1 ")
    .trim();
}

function displayMs(value) {
  return value === null || value === undefined || value === "" ? "Not available" : `${value} ms`;
}

function formatBytes(value) {
  if (!Number.isFinite(value)) return "Not available";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = value;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) { size /= 1024; unit += 1; }
  return `${size.toFixed(unit ? 1 : 0)} ${units[unit]}`;
}

function formatSignedBytes(value) {
  if (!Number.isFinite(value)) return "Not available";
  return `${value >= 0 ? "+" : ""}${formatBytes(value)}`;
}

function formatUptime(seconds) {
  if (!Number.isFinite(seconds)) return "Not available";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function OsMonitoringConsole({ metrics, queries, error, onRefresh }) {
  const memory = metrics?.memory;
  const process = metrics?.process;
  const cpu = metrics?.cpu;
  const health = metrics?.health || "unknown";
  const healthLabel = health === "healthy" ? "Healthy" : health === "watch" ? "Watch" : health === "attention" ? "Attention" : "Waiting";
  return (
    <>
      <section className="dev-os-hero">
        <div><p className="dev-section-eyebrow">Runtime telemetry</p><h2>Operating System Monitoring Console</h2><p>Live health signals from the MedChart server process and host machine.</p><span className={`dev-health-badge is-${health}`}><i /> {healthLabel}</span></div>
        <div className="dev-os-host"><span>Host platform</span><strong>{metrics?.host ? `${metrics.host.platform} · ${metrics.host.architecture}` : "Loading…"}</strong><small>{metrics?.host?.nodeVersion || "Node runtime"}</small></div>
      </section>
      {error && <p className="dev-error">{error}</p>}
      <section className="dev-os-grid" aria-label="Operating system metrics">
        <div className="dev-os-card"><div className="dev-os-card-top"><span className="dev-metric-icon">CPU</span><span className="dev-os-label">CPU utilization</span></div><strong>{cpu?.utilizationPercent === null || cpu?.utilizationPercent === undefined ? "Sampling…" : `${cpu.utilizationPercent}%`}</strong><small>{metrics?.host?.cpuCores || "—"} logical cores · sampled between requests</small><div className="dev-progress"><i style={{ width: `${Math.min(cpu?.utilizationPercent || 0, 100)}%` }} /></div></div>
        <div className="dev-os-card"><div className="dev-os-card-top"><span className="dev-metric-icon">RAM</span><span className="dev-os-label">Memory used</span></div><strong>{memory ? `${memory.usedPercent}%` : "—"}</strong><small>{memory ? `${formatBytes(memory.usedBytes)} of ${formatBytes(memory.totalBytes)}` : "Waiting for metrics"}</small><div className="dev-progress"><i style={{ width: `${memory?.usedPercent || 0}%` }} /></div></div>
        <div className="dev-os-card"><div className="dev-os-card-top"><span className="dev-metric-icon">APP</span><span className="dev-os-label">Process RSS</span></div><strong>{formatBytes(process?.rssBytes)}</strong><small>Heap {formatBytes(process?.heapUsedBytes)} of {formatBytes(process?.heapTotalBytes)}</small></div>
        <div className="dev-os-card"><div className="dev-os-card-top"><span className="dev-metric-icon">↻</span><span className="dev-os-label">Event loop</span></div><strong>{displayMs(metrics?.eventLoopDelayMs)}</strong><small>Node.js responsiveness probe</small></div>
        <div className="dev-os-card"><div className="dev-os-card-top"><span className="dev-metric-icon">NET</span><span className="dev-os-label">Network visibility</span></div><strong>{metrics?.network?.activeAddressCount ?? "—"}</strong><small>{metrics?.network?.interfaceCount ?? "—"} interfaces · active host addresses</small></div>
      </section>
      <section className="dev-panel dev-os-details">
        <div className="dev-panel-heading"><div><p className="dev-section-eyebrow">Host and process details</p><h2>Cross-layer runtime state</h2><p>Use these signals to relate operating-system pressure to database execution behavior.</p></div><button type="button" className="dev-refresh" onClick={onRefresh}><span>↻</span> Refresh now</button></div>
        <div className="dev-os-detail-grid">
          <span>CPU model <strong>{metrics?.host?.cpuModel || "Not available"}</strong></span>
          <span>Load average <strong>{cpu?.loadAverage?.join(" · ") || "Not available"}</strong></span>
          <span>Server uptime <strong>{formatUptime(process?.uptimeSeconds)}</strong></span>
          <span>Free memory <strong>{memory ? `${formatBytes(memory.freeBytes)} (${memory.freePercent}%)` : "Not available"}</strong></span>
          <span>Process identity <strong>{process?.pid ? `PID ${process.pid}` : "Not available"}</strong></span>
          <span>Last sample <strong>{metrics?.timestamp ? new Date(metrics.timestamp).toLocaleTimeString() : "Not available"}</strong></span>
        </div>
      </section>
      <section className="dev-panel dev-os-query-panel">
        <div className="dev-panel-heading"><div><p className="dev-section-eyebrow">Per-query resource trace</p><h2>OS consumption by query</h2><p>Each card shows the MedChart server-process resources captured for an individual database execution.</p></div><span className="dev-count">{queries.filter((query) => query.osRuntime).length} sampled</span></div>
        {queries.filter((query) => query.osRuntime).length === 0 ? <p className="dev-empty">Execute a patient, doctor, report, or appointment workflow to capture per-query OS consumption.</p> : (
          <div className="dev-os-query-grid">
            {queries.filter((query) => query.osRuntime).slice(0, 12).map((query) => (
              <article className="dev-os-query-card" key={query.id}>
                <div className="dev-os-query-heading"><div><span>{query.route || "Database operation"}</span><strong>{formatSql(query.sql).split("\n")[0]}</strong></div><b className={query.success ? "is-success" : "is-failed"}>{query.success ? "SUCCESS" : "FAILED"}</b></div>
                <div className="dev-os-query-metrics">
                  <span>DB time<strong>{displayMs(query.osRuntime.databaseExecutionMs)}</strong></span>
                  <span>Process CPU<strong>{displayMs((query.osRuntime.processCpuUserMs || 0) + (query.osRuntime.processCpuSystemMs || 0))}</strong></span>
                  <span>RSS change<strong>{formatSignedBytes(query.osRuntime.rssDeltaBytes)}</strong></span>
                  <span>Heap after<strong>{formatBytes(query.osRuntime.heapUsedAfterBytes)}</strong></span>
                </div>
                <small className="dev-os-query-time">{formatTime(query.timestamp)} · {query.rowCount ?? 0} row(s) · {query.actor || "anonymous"}</small>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function queryCategory(query) {
  const source = `${query.route} ${query.sql}`.toLowerCase();
  if (source.includes("auth/login") || source.includes("auth/signup") || source.includes("password_hash")) return "Authentication & login";
  if (source.includes("treatment") || source.includes("treatment_status")) return "Treatment lifecycle";
  if (source.includes("report_document") || source.includes("/reports")) return "Clinical reports";
  if (source.includes("appointment") || source.includes("/appointments")) return "Appointments";
  if (source.includes("department")) return "Departments & doctors";
  if (source.includes("/auth/me")) return "Session verification";
  return "Other database operations";
}

function groupQueries(queries) {
  const groups = new Map();
  queries.forEach((query) => {
    const category = queryCategory(query);
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push(query);
  });
  return [...groups.entries()].map(([name, items]) => ({ name, items }));
}

function QueryCard({ name, items, token }) {
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const [actionMessage, setActionMessage] = useState("");
  const [applying, setApplying] = useState(false);
  const selected = items.find((item) => item.id === selectedId) || items[0];
  const average = items.reduce((sum, item) => sum + item.durationMs, 0) / items.length;
  const totalRows = items.reduce((sum, item) => sum + (item.rowCount || 0), 0);
  return (
    <article className="dev-scratch-card">
      <header className="dev-card-heading">
        <div><p className="dev-card-kicker">Query scratch card</p><h3>{name}</h3></div>
        <span className="dev-count">{items.length} run{items.length === 1 ? "" : "s"}</span>
      </header>
      <div className="dev-card-stats">
        <span>Avg <strong>{average.toFixed(2)} ms</strong></span>
        <span>Rows <strong>{totalRows}</strong></span>
        <span>Latest <strong>{items[0].durationMs} ms</strong></span>
      </div>
      <div className="dev-query-list">
        {items.slice(0, 8).map((item) => (
          <button type="button" key={item.id} className={`dev-query-item ${selected.id === item.id ? "is-selected" : ""}`} onClick={() => setSelectedId(item.id)}>
            <span>{formatTime(item.timestamp)}</span><code>{formatSql(item.sql).split("\n")[0]}</code><strong>{item.durationMs} ms</strong>
          </button>
        ))}
      </div>
      {selected && (
        <div className="dev-query-detail">
          <div className="dev-detail-grid">
            <span>Execution time <strong>{selected.durationMs} ms</strong></span>
            <span>Cardinality <strong>{selected.rowCount} row(s)</strong></span>
            <span>Parameters <strong>{selected.parameterCount}</strong></span>
            <span>Status <strong className={selected.success ? "dev-ok" : "dev-fail"}>{selected.success ? "Success" : "Failed"}</strong></span>
          </div>
          {selected.osRuntime && (
            <div className="dev-optimization dev-query-os-panel">
              <div className="dev-section-title-row"><p className="dev-detail-label">OS consumption for this query</p><span className="dev-os-sample-badge">Runtime sample</span></div>
              <div className="dev-query-os-grid">
                <div><span>Database execution</span><strong>{displayMs(selected.osRuntime.databaseExecutionMs)}</strong><small>PostgreSQL call only</small></div>
                <div><span>Server wall-clock</span><strong>{displayMs(selected.osRuntime.wallClockMs)}</strong><small>Full instrumented request</small></div>
                <div><span>Process CPU</span><strong>{displayMs((selected.osRuntime.processCpuUserMs || 0) + (selected.osRuntime.processCpuSystemMs || 0))}</strong><small>User + system CPU time</small></div>
                <div><span>Database CPU</span><strong>{displayMs((selected.osRuntime.databaseCpuUserMs || 0) + (selected.osRuntime.databaseCpuSystemMs || 0))}</strong><small>CPU during database call</small></div>
                <div><span>RSS change</span><strong>{formatSignedBytes(selected.osRuntime.rssDeltaBytes)}</strong><small>{formatBytes(selected.osRuntime.rssAfterBytes)} after query</small></div>
                <div><span>Heap after query</span><strong>{formatBytes(selected.osRuntime.heapUsedAfterBytes)}</strong><small>Node.js heap used</small></div>
              </div>
              <p className="dev-query-os-note">This is a process-level sample captured for this execution. It shows server resource consumption, not the database server's internal CPU or memory usage.</p>
            </div>
          )}
          <p className="dev-detail-label">Formatted parameterized SQL</p>
          <pre className="dev-pre"><code>{formatSql(selected.sql)}</code></pre>
          {selected.optimization && (
            <div className="dev-optimization">
              <p className="dev-detail-label">Optimizer advisor</p>
              <div className="dev-plan-grid">
                <span>Root node <strong>{selected.optimization.rootNode || "Not analyzed"}</strong></span>
                <span>Estimated cost <strong>{selected.optimization.estimatedCost ?? "—"}</strong></span>
                <span>Estimated rows <strong>{selected.optimization.estimatedRows ?? "—"}</strong></span>
                <span>Index access <strong>{selected.optimization.usesIndex ? "Detected" : "Not detected"}</strong></span>
              </div>
              <p className="dev-recommendation">{selected.optimization.recommendation}</p>
            </div>
          )}
          {selected.optimizer?.model && (
            <div className="dev-optimization dev-ai-model">
              <div className="dev-section-title-row"><p className="dev-detail-label">Predictive latency model</p><span className="dev-status-pill">{selected.optimizer.model.readyForRewrite ? "Rewrite eligible" : "Learning"}</span></div>
              <div className="dev-plan-grid">
                <span>Method <strong>{selected.optimizer.model.algorithm || "Online regression"}</strong></span>
                <span>Observations <strong>{selected.optimizer.model.observations ?? 0}</strong></span>
                <span>Baseline prediction <strong>{displayMs(selected.optimizer.model.originalPredictedLatencyMs)}</strong></span>
                <span>Decision time <strong>{displayMs(selected.optimizer.decisionTimeMs)}</strong></span>
              </div>
              <div className="dev-model-metrics">
                <span>Mean absolute error <strong>{displayMs(selected.optimizer.model.meanAbsoluteErrorMs)}</strong></span>
                <span>Last actual <strong>{displayMs(selected.optimizer.model.lastActualMs)}</strong></span>
                <span>Last prediction error <strong>{displayMs(selected.optimizer.model.lastAbsoluteErrorMs)}</strong></span>
              </div>
              <div className="dev-feature-row">
                <span>Features used</span>
                {(selected.optimizer.model.featureNames || []).map((feature) => <em key={feature}>{feature}</em>)}
              </div>
              <p className="dev-recommendation">
                {selected.optimizer.selectedCandidate
                  ? `Selected candidate predicts ${selected.optimizer.selectedCandidate.predictedLatencyMs} ms (${Math.round(selected.optimizer.selectedCandidate.predictedImprovementRatio * 100)}% improvement).`
                  : `The model needs ${selected.optimizer.model.minimumObservationsForRewrite ?? 20} observations and a predicted improvement threshold before it can rewrite a query.`}
              </p>
            </div>
          )}
          <div className="dev-optimization dev-rewrite-panel">
            <div className="dev-rewrite-heading">
              <div><p className="dev-detail-label">Rewrite candidates</p><span className="dev-rewrite-caption">Candidate SQL generated from the current query and compared before execution.</span></div>
              <span className="dev-candidate-count">{selected.optimizer?.candidates?.length ?? 0} candidate{selected.optimizer?.candidates?.length === 1 ? "" : "s"}</span>
            </div>
            <div className="dev-original-query"><span>Original query</span><code>{formatSql(selected.sql)}</code></div>
            {selected.optimizer?.candidates?.length ? (
              <div className="dev-rewrite-list">
                {selected.optimizer.candidates.map((candidate, index) => {
                  const isSelected = selected.optimizer.selectedCandidate?.sql === candidate.sql;
                  return (
                    <div className={`dev-rewrite-candidate ${isSelected ? "is-selected" : ""}`} key={`${candidate.kind}-${candidate.sql}-${index}`}>
                      <div className="dev-rewrite-candidate-head">
                        <span><b>{candidate.kind === "explicit_projection" ? "Explicit projection" : "Rewrite"}</b>{isSelected && <em>Selected</em>}</span>
                        <span>{candidate.predictedLatencyMs ?? "—"} ms predicted</span>
                      </div>
                      <pre className="dev-rewrite-sql"><code>{formatSql(candidate.sql)}</code></pre>
                      <p>{candidate.explanation || "Candidate generated by the optimizer."} {candidate.plan?.cost !== undefined ? `Estimated candidate cost: ${candidate.plan.cost}.` : ""}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="dev-no-rewrite">No safe rewrite candidate was generated for this query. PostgreSQL's original plan remains the execution path.</p>
            )}
          </div>
          {selected.optimizer?.model && (
            <div className="dev-optimization dev-decision-panel">
              <div className="dev-section-title-row"><p className="dev-detail-label">Plan decision evidence</p><span className="dev-decision-badge">{selected.optimizer.selectedCandidate ? "Candidate selected" : "Baseline retained"}</span></div>
              <div className="dev-decision-grid">
                <div className="dev-decision-metric"><span>Actual execution</span><strong>{displayMs(selected.durationMs)}</strong><small>Measured PostgreSQL request time</small></div>
                <div className="dev-decision-metric"><span>Model baseline</span><strong>{displayMs(selected.optimizer.model.originalPredictedLatencyMs)}</strong><small>Predicted original query time</small></div>
                <div className="dev-decision-metric"><span>Optimizer decision</span><strong>{displayMs(selected.optimizer.decisionTimeMs)}</strong><small>Plan analysis and ranking time</small></div>
                <div className="dev-decision-metric"><span>Selected candidate</span><strong>{selected.optimizer.selectedCandidate ? displayMs(selected.optimizer.selectedCandidate.predictedLatencyMs) : "None"}</strong><small>{selected.optimizer.selectedCandidate ? "Predicted candidate time" : "Original plan executed"}</small></div>
              </div>
              <div className="dev-decision-foot"><span>Timing interpretation</span><p>The model ranks safe candidates using plan features. PostgreSQL supplies the plan, while actual execution time is the final source of truth.</p></div>
            </div>
          )}
          {selected.optimizer?.indexCandidates?.length > 0 && (
            <div className="dev-optimizer-actions">
              <p className="dev-detail-label">Safe optimizer candidates</p>
              {selected.optimizer.indexCandidates.map((candidate) => (
                <div className="dev-candidate" key={`${candidate.table}-${candidate.name}`}>
                  <div><strong>{candidate.table} ({candidate.columns.join(", ")})</strong><small>{candidate.explanation}</small></div>
                  <button
                    type="button"
                    disabled={applying}
                    onClick={async () => {
                      setApplying(true);
                      setActionMessage("");
                      try {
                        const result = await applyIndexRecommendationRequest(token, { table: candidate.table, columns: candidate.columns });
                        setActionMessage(result.message);
                      } catch (err) {
                        setActionMessage(err.message);
                      } finally {
                        setApplying(false);
                      }
                    }}
                  >{applying ? "Applying…" : "Approve index"}</button>
                </div>
              ))}
              {actionMessage && <p className="dev-action-message">{actionMessage}</p>}
            </div>
          )}
          <p className="dev-detail-meta">{selected.route} · {selected.actor} · {formatTime(selected.timestamp)}{selected.error ? ` · ${selected.error}` : ""}</p>
        </div>
      )}
    </article>
  );
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function DeveloperDashboard({ user, onLogout }) {
  const [dashboard, setDashboard] = useState({ summary: {}, queries: [] });
  const [error, setError] = useState("");
  const [queryFilter, setQueryFilter] = useState("all");
  const [consoleMode, setConsoleMode] = useState("query");
  const [osMetrics, setOsMetrics] = useState(null);
  const [osError, setOsError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setDashboard(await getQueryDashboardRequest(getToken()));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 3000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const refreshOs = useCallback(async () => {
    try {
      setOsMetrics(await getOsDashboardRequest(getToken()));
      setOsError("");
    } catch (err) {
      setOsError(err.message);
    }
  }, []);

  useEffect(() => {
    if (consoleMode !== "os") return undefined;
    refreshOs();
    const timer = window.setInterval(refreshOs, 3000);
    return () => window.clearInterval(timer);
  }, [consoleMode, refreshOs]);

  const summary = dashboard.summary;
  const latestModel = dashboard.queries.find((query) => query.optimizer?.model)?.optimizer?.model;
  const filteredQueries = [...dashboard.queries]
    .filter((query) => queryFilter === "all"
      || (queryFilter === "candidates" && query.optimizer?.candidates?.length)
      || (queryFilter === "failed" && !query.success))
    .sort((a, b) => queryFilter === "slowest" ? b.durationMs - a.durationMs : 0);
  return (
    <div className="dev-shell">
      <header className="dev-header">
        <div className="dev-brand-lockup">
          <div className="dev-brand-mark">M</div>
          <div>
          <p className="dev-kicker">MedChart · DBMS observability</p>
          <h1>{consoleMode === "query" ? "Developer Query Console" : "OS Monitoring Console"}</h1>
          <p className="dev-subtitle">{consoleMode === "query" ? "Live SQL execution telemetry from the healthcare workflow" : "Live operating-system and server-process telemetry"}</p>
          </div>
        </div>
        <div className="dev-header-actions">
          <button type="button" className="dev-console-switch" onClick={() => setConsoleMode(consoleMode === "query" ? "os" : "query")}><i /> {consoleMode === "query" ? "Switch to OS monitor" : "Switch to query monitor"}</button>
          <span className="dev-user-email">{user.email}</span>
          <button type="button" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="dev-main">
        {consoleMode === "query" ? <>
        <section className="dev-metrics" aria-label="Query performance summary">
          <div className="dev-metric"><span><b className="dev-metric-icon">Σ</b> Total queries</span><strong>{summary.totalQueries ?? 0}</strong><small>Captured in session</small></div>
          <div className="dev-metric"><span><b className="dev-metric-icon">◷</b> Average time</span><strong>{summary.averageDurationMs ?? 0} ms</strong><small>Across all executions</small></div>
          <div className="dev-metric dev-metric-good"><span><b className="dev-metric-icon">✓</b> Successful</span><strong>{summary.successfulQueries ?? 0}</strong><small>Completed queries</small></div>
          <div className="dev-metric"><span><b className="dev-metric-icon">!</b> Failed</span><strong className={summary.failedQueries ? "dev-danger" : ""}>{summary.failedQueries ?? 0}</strong><small>Needs attention</small></div>
          <div className="dev-metric"><span><b className="dev-metric-icon">⌁</b> Plans analyzed</span><strong>{summary.explainedQueries ?? 0}</strong><small>PostgreSQL EXPLAIN</small></div>
          <div className="dev-metric"><span><b className="dev-metric-icon">↗</b> Index plans</span><strong>{summary.optimizedPlanQueries ?? 0}</strong><small>Index access detected</small></div>
        </section>

        <section className="dev-status-strip" aria-label="Optimizer status">
          <div className="dev-status-main">
            <span className={`dev-status-dot ${latestModel?.readyForRewrite ? "is-ready" : ""}`} />
            <div><strong>{latestModel?.readyForRewrite ? "Predictive ranking ready" : "Predictive model learning"}</strong><span>{latestModel?.readyForRewrite ? "Safe candidate ranking is available" : `Collecting observations before rewrite decisions (${latestModel?.observations ?? 0}/${latestModel?.minimumObservationsForRewrite ?? 20})`}</span></div>
          </div>
          <div className="dev-status-facts">
            <span>Model <strong>{latestModel?.algorithm || "Online regression"}</strong></span>
            <span>Rewrite gate <strong>{latestModel?.readyForRewrite ? "Eligible" : "Learning"}</strong></span>
            <span>Candidate suggestions <strong>{summary.rewriteCandidates ?? 0}</strong></span>
          </div>
        </section>

        <section className="dev-panel">
          <div className="dev-panel-heading">
            <div><p className="dev-section-eyebrow">Live workload explorer</p><h2>Query scratch cards</h2><p>Grouped by workflow. Inspect SQL, cardinality, plan evidence and predictive candidate scores.</p></div>
            <button type="button" className="dev-refresh" onClick={refresh}><span>↻</span> Refresh now</button>
          </div>
          <div className="dev-filter-row" aria-label="Query filters">
            {[['all', 'All executions'], ['slowest', 'Slowest first'], ['candidates', 'Has candidates'], ['failed', 'Failed']].map(([value, label]) => <button key={value} type="button" className={queryFilter === value ? "is-active" : ""} onClick={() => setQueryFilter(value)}>{label}</button>)}
          </div>
          {error && <p className="dev-error">{error}</p>}
          {dashboard.queries.length === 0 ? <p className="dev-empty">No queries captured yet. Use the patient or doctor workflow, then return here.</p> : filteredQueries.length === 0 ? <p className="dev-empty">No executions match this filter.</p> : (
            <div className="dev-card-grid">{groupQueries(filteredQueries).map((group) => <QueryCard key={group.name} {...group} token={getToken()} />)}</div>
          )}
        </section>

        <section className="dev-panel dev-guidance">
          <p className="dev-section-eyebrow">Faculty demo path</p><h2>How to demonstrate the cross-layer flow</h2>
          <div className="dev-flow"><span>Patient login</span><b>→</b><span>Book appointment</span><b>→</b><span>Doctor confirms</span><b>→</b><span>Treatment active</span><b>→</b><span>Report fetch</span></div>
          <p>Every step produces database activity in this console. Execution time is measured around the PostgreSQL call; failed queries are retained for diagnosis.</p>
        </section>
        </> : <OsMonitoringConsole metrics={osMetrics} queries={dashboard.queries} error={osError} onRefresh={refreshOs} />}
      </main>
    </div>
  );
}
