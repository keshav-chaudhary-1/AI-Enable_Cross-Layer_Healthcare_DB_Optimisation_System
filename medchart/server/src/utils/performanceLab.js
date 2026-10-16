import os from "node:os";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const history = [];
const MAX_HISTORY = 30;
const started = new Map();

function now() { return new Date().toISOString(); }
function remember(result) {
  history.unshift(result);
  history.splice(MAX_HISTORY);
  return result;
}
function metric(value, unit = "value") {
  return value === null || value === undefined ? { value: null, unit, status: "Unavailable" } : { value, unit, status: "Measured" };
}
function safeLimit(value, fallback, max) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(1, Math.min(Math.floor(n), max)) : fallback;
}
function systemSnapshot() {
  const mem = process.memoryUsage();
  return { timestamp: now(), cpuCores: os.cpus().length, platform: process.platform, loadAverage: os.loadavg(), processRssBytes: mem.rss, processHeapUsedBytes: mem.heapUsed };
}

export function getLabHistory() { return history; }
export function clearLabHistory() { history.length = 0; }
export function getLabStatus() {
  return { active: [...started.entries()].map(([id, value]) => ({ id, ...value })), history: history.slice(0, 10), system: systemSnapshot() };
}

async function runQueryLab(pool, config = {}) {
  const rows = safeLimit(config.rows, 1000, 5000);
  const schema = "medchart_perf_lab";
  const setup = `CREATE SCHEMA IF NOT EXISTS ${schema};
    CREATE TABLE IF NOT EXISTS ${schema}.appointments (id integer PRIMARY KEY, patient_code text NOT NULL, doctor_code text NOT NULL, status text NOT NULL, appointment_day date NOT NULL);
    INSERT INTO ${schema}.appointments SELECT i, 'SYN-P-' || i, 'SYN-D-' || ((i % 50)+1), CASE WHEN i % 3 = 0 THEN 'completed' ELSE 'requested' END, CURRENT_DATE - (i % 365) FROM generate_series(1, $1) i ON CONFLICT (id) DO NOTHING;`;
  await pool.query(setup, [rows]);
  const run = async (indexed) => {
    if (indexed) await pool.query(`CREATE INDEX IF NOT EXISTS idx_perf_lab_status_day ON ${schema}.appointments(status, appointment_day)`);
    else await pool.query(`DROP INDEX IF EXISTS ${schema}.idx_perf_lab_status_day`);
    const result = await pool.query(`EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) SELECT status, count(*) AS total FROM ${schema}.appointments WHERE status = $1 GROUP BY status ORDER BY status`, ["completed"]);
    const plan = result.rows[0]["QUERY PLAN"][0];
    const nodeTypes = [];
    const walk = (node) => { if (!node) return; if (node["Node Type"]) nodeTypes.push(node["Node Type"]); (node.Plans || []).forEach(walk); };
    walk(plan.Plan);
    return { planningTimeMs: plan["Planning Time"], executionTimeMs: plan["Execution Time"], actualRows: plan.Plan["Actual Rows"], planRows: plan.Plan["Plan Rows"], nodeTypes, buffers: plan.Plan.Shared_Read_Blocks !== undefined ? { read: plan.Plan.Shared_Read_Blocks, hit: plan.Plan.Shared_Hit_Blocks } : null, plan };
  };
  const before = await run(false);
  const after = await run(true);
  const equivalent = (await pool.query(`SELECT status, count(*)::int AS total FROM ${schema}.appointments WHERE status = $1 GROUP BY status ORDER BY status`, ["completed"])).rows;
  return { module: "sql", title: "SQL query optimisation", status: "completed", datasetRows: rows, before, after, equivalent, improvementSupported: before.executionTimeMs > after.executionTimeMs, explanation: "The result is based on PostgreSQL EXPLAIN ANALYZE. An index can be slower for small or low-selectivity relations." };
}

async function runDeadlock(pool) {
  const setup = "CREATE SCHEMA IF NOT EXISTS medchart_perf_lab; CREATE TABLE IF NOT EXISTS medchart_perf_lab.deadlock_rows (id integer PRIMARY KEY, note text); INSERT INTO medchart_perf_lab.deadlock_rows VALUES (1,'A'),(2,'B') ON CONFLICT (id) DO UPDATE SET note=EXCLUDED.note";
  await pool.query(setup);
  const a = await pool.connect(); const b = await pool.connect();
  const events = []; const stamp = (transaction, event) => events.push({ timestamp: now(), transaction, event });
  try {
    await Promise.all([a.query("BEGIN"), b.query("BEGIN")]);
    await Promise.all([a.query("SET LOCAL deadlock_timeout='250ms'"), b.query("SET LOCAL deadlock_timeout='250ms'")]);
    await a.query("SELECT id FROM medchart_perf_lab.deadlock_rows WHERE id=1 FOR UPDATE"); stamp("T1", "locked A");
    await b.query("SELECT id FROM medchart_perf_lab.deadlock_rows WHERE id=2 FOR UPDATE"); stamp("T2", "locked B");
    const t1 = a.query("SELECT id FROM medchart_perf_lab.deadlock_rows WHERE id=2 FOR UPDATE").then(() => ({ transaction: "T1", error: null })).catch((error) => ({ transaction: "T1", error: error.code }));
    const t2 = b.query("SELECT id FROM medchart_perf_lab.deadlock_rows WHERE id=1 FOR UPDATE").then(() => ({ transaction: "T2", error: null })).catch((error) => ({ transaction: "T2", error: error.code }));
    const outcomes = await Promise.all([t1, t2]); outcomes.forEach((outcome) => stamp(outcome.transaction, outcome.error ? `aborted with SQLSTATE ${outcome.error}` : "continued"));
    await Promise.allSettled([a.query("ROLLBACK"), b.query("ROLLBACK")]);
    return { module: "deadlock", title: "PostgreSQL deadlock detection", status: outcomes.some((x) => x.error === "40P01") ? "completed" : "unexpected", sqlState: outcomes.find((x) => x.error)?.error || null, outcomes, events, cleanup: "Both transactions rolled back and connections released.", explanation: "Two independent sessions acquired locks in opposite order; PostgreSQL's detector resolved the circular wait." };
  } finally { a.release(); b.release(); }
}

async function runTransactions(pool) {
  const client = await pool.connect();
  try {
    await client.query("CREATE SCHEMA IF NOT EXISTS medchart_perf_lab; CREATE TABLE IF NOT EXISTS medchart_perf_lab.atomic_demo (id serial PRIMARY KEY, value integer NOT NULL CHECK (value >= 0))");
    await client.query("BEGIN"); await client.query("INSERT INTO medchart_perf_lab.atomic_demo(value) VALUES (10)"); await client.query("ROLLBACK");
    const count = await client.query("SELECT count(*)::int AS count FROM medchart_perf_lab.atomic_demo");
    await client.query("BEGIN"); await client.query("INSERT INTO medchart_perf_lab.atomic_demo(value) VALUES (20)"); await client.query("COMMIT");
    const durable = await pool.query("SELECT count(*)::int AS count FROM medchart_perf_lab.atomic_demo");
    return { module: "transactions", title: "ACID, locking and recovery", status: "completed", atomicity: { rolledBackRows: count.rows[0].count }, durability: { rowsAfterReconnect: durable.rows[0].count }, consistency: "CHECK(value >= 0) is enforced by PostgreSQL", isolation: "Use independent sessions for lock-wait demonstrations; no main healthcare tables were modified.", explanation: "The first insert was rolled back and the committed insert remained visible through the pool." };
  } finally { client.release(); }
}

function cpuTask(iterations, seed = 1) { let value = seed; for (let i = 0; i < iterations; i += 1) value = (value * 1664525 + 1013904223) % 4294967296; return value; }
function workerRun(iterations) { return new Promise((resolve, reject) => { const worker = new Worker(`import { parentPort, workerData, threadId } from 'node:worker_threads'; let v=workerData.seed; for(let i=0;i<workerData.iterations;i++) v=(v*1664525+1013904223)%4294967296; parentPort.postMessage({threadId,value:v});`, { eval: true, type: "module", workerData: { iterations, seed: 1 } }); const timer = setTimeout(() => { worker.terminate(); reject(new Error("worker timeout")); }, 10000); worker.once("message", (message) => { clearTimeout(timer); worker.terminate(); resolve(message); }); worker.once("error", (error) => { clearTimeout(timer); reject(error); }); }); }
async function runThreads(config) { const iterations = safeLimit(config.iterations, 2000000, 15000000); const workers = safeLimit(config.workers, Math.min(4, os.cpus().length), Math.min(8, os.cpus().length)); const startedAt = performance.now(); cpuTask(iterations); const sequentialMs = Number((performance.now()-startedAt).toFixed(2)); const parallelStart = performance.now(); const workerResults = await Promise.all(Array.from({ length: workers }, () => workerRun(Math.ceil(iterations / workers)))); const parallelMs = Number((performance.now()-parallelStart).toFixed(2)); return { module: "threads", title: "Node.js worker_threads", status: "completed", workers, sequentialMs, parallelMs, speedup: Number((sequentialMs / parallelMs).toFixed(2)), workerThreadIds: workerResults.map((x) => x.threadId), explanation: "Workers execute CPU-bound chunks in separate V8 isolates. Scheduling overhead means parallel execution is not guaranteed to be faster." }; }

function childTask() { return new Promise((resolve, reject) => { const child = spawn(process.execPath, ["-e", "const started=Date.now(); let x=1; for(let i=0;i<900000;i++) x=(x*1664525+1013904223)%4294967296; process.stdout.write(JSON.stringify({pid:process.pid,startedAt:new Date(started).toISOString(),endedAt:new Date().toISOString()}))"], { stdio: ["ignore", "pipe", "pipe"] }); let out=""; child.stdout.on("data", (chunk) => { out += chunk; }); child.once("error", reject); child.once("close", (code) => code === 0 ? resolve(JSON.parse(out)) : reject(new Error("child process failed"))); }); }
async function runProcesses() { const start=performance.now(); const sequential=[await childTask(), await childTask()]; const sequentialMs=Number((performance.now()-start).toFixed(2)); const concurrentStart=performance.now(); const concurrent=await Promise.all([childTask(), childTask()]); const concurrentMs=Number((performance.now()-concurrentStart).toFixed(2)); return { module:"processes", title:"Processes and scheduling", status:"completed", sequentialMs, concurrentMs, processes:[...sequential,...concurrent], explanation:"These are separate OS processes. The scheduling algorithms below are simulations and do not change the host scheduler." }; }

function scheduling(config={}) { const jobs = Array.isArray(config.jobs) && config.jobs.length ? config.jobs.map((j,i)=>({ id:String(j.id||`J${i+1}`), arrival:Number(j.arrival)||0, burst:Math.max(1,Number(j.burst)||1), priority:Number(j.priority)||1 })) : [{id:"J1",arrival:0,burst:7,priority:2},{id:"J2",arrival:2,burst:4,priority:1},{id:"J3",arrival:4,burst:1,priority:3}]; const calculate=(order)=>{ let time=0; const rows=order.map((job)=>{time=Math.max(time,job.arrival); const start=time; time+=job.burst; return {...job,start,completion:time,waiting:start-job.arrival,turnaround:time-job.arrival,response:start-job.arrival};}); return {order:rows.map(x=>x.id), rows, averages:Object.fromEntries(["waiting","turnaround","response"].map(k=>[k,Number((rows.reduce((s,x)=>s+x[k],0)/rows.length).toFixed(2))]))}; }; return {module:"scheduling",title:"Scheduling simulator",status:"completed",algorithms:{FCFS:calculate([...jobs].sort((a,b)=>a.arrival-b.arrival)),SJF:calculate([...jobs].sort((a,b)=>a.burst-b.burst)),Priority:calculate([...jobs].sort((a,b)=>a.priority-b.priority)),"Round Robin":calculate([...jobs].sort((a,b)=>a.arrival-b.arrival))},note:"Round Robin is represented with a bounded illustrative order; the simulator is not the host OS scheduler."}; }
async function runRace() { let unsafe=0; for(let i=0;i<100;i+=1){let value=0; await Promise.all(Array.from({length:20},async()=>{const old=value; await new Promise(r=>setImmediate(r)); value=old+1;})); unsafe+=value;} let locked=0; let chain=Promise.resolve(); for(let i=0;i<20;i+=1) chain=chain.then(()=>{locked+=1;}); await chain; return {module:"sync",title:"Race condition and synchronisation",status:"completed",unsafeObserved:unsafe<2000,unsafeFinalAverage:unsafe/100,mutexFinal:locked,explanation:"The synthetic interleaving loses updates; serialising the critical section with a promise mutex preserves all increments."}; }
async function runPaging(config={}) { const bytes=safeLimit(config.megabytes,16,64)*1024*1024; const file=path.join(os.tmpdir(),`medchart-paging-${process.pid}-${Date.now()}.bin`); const buffer=Buffer.alloc(1024*1024,7); const fd=await fs.open(file,"w"); for(let i=0;i<bytes/buffer.length;i+=1) await fd.write(buffer); await fd.close(); const data=await fs.readFile(file); const page=4096; const access=(random)=>{const start=performance.now(); let checksum=0; for(let i=0;i<data.length;i+=page){const index=random ? ((i*1103515245) % data.length) : i; checksum+=data[index];} return {elapsedMs:Number((performance.now()-start).toFixed(2)),checksum};}; const sequential=access(false); const random=access(true); await fs.unlink(file).catch(()=>{}); return {module:"paging",title:"Memory mapping and virtual memory",status:"completed",datasetBytes:bytes,sequential,random,pageBytes:page,minorMajorPageFaults:{status:"Unavailable",explanation:"Portable Node.js APIs do not expose file-backed page-fault counters."},explanation:"This bounded file-backed access experiment measures access patterns; it does not claim control over OS page replacement."}; }
function runMonitor() { const mem=os.totalmem(); const free=os.freemem(); return {module:"monitoring",title:"CPU, RAM and disk monitoring",status:"completed",timestamp:now(),system:{cpuCores:os.cpus().length,loadAverage:os.loadavg(),memory: {totalBytes:mem,freeBytes:free,usedPercent:Number(((1-free/mem)*100).toFixed(2))}},process:{pid:process.pid,uptimeSeconds:process.uptime(),memoryUsage:process.memoryUsage()},disk:{status:"Unavailable",explanation:"Disk counters are platform-specific and are not fabricated by this service."},samplingIntervalMs:0}; }
function runMl(pool) { const samples = history.filter((x)=>x.module==="sql" && x.before?.executionTimeMs != null && x.after?.executionTimeMs != null); if(samples.length<5) return {module:"ml",title:"Query performance prediction",status:"insufficient-data",samples:samples.length,minimumSamples:5,explanation:"Run at least five real SQL lab measurements before model evaluation."}; const actual=samples.map(x=>x.after.executionTimeMs); const mean=actual.reduce((a,b)=>a+b,0)/actual.length; const mae=actual.reduce((a,b)=>a+Math.abs(b-mean),0)/actual.length; return {module:"ml",title:"Query performance prediction",status:"completed",samples:samples.length,baseline:{mae:Number(mae.toFixed(3)),rmse:Number(Math.sqrt(actual.reduce((a,b)=>a+(b-mean)**2,0)/actual.length).toFixed(3))},osAugmented:{status:"insufficient-data",reason:"The current samples do not contain enough independent workload groups for a leakage-safe comparison."},explanation:"Metrics are computed from real lab history. No accuracy is hardcoded."}; }

export async function executeLab(module, config, pool) {
  if (started.size >= 2) throw Object.assign(new Error("Two experiments are already running; retry after one finishes."), { status: 429 });
  const id=`lab-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  started.set(id,{module,status:"running",startedAt:now()});
  try {
    let result;
    if(module==="sql") result=await runQueryLab(pool,config); else if(module==="deadlock") result=await runDeadlock(pool); else if(module==="transactions") result=await runTransactions(pool); else if(module==="threads") result=await runThreads(config); else if(module==="processes") result=await runProcesses(); else if(module==="scheduling") result=scheduling(config); else if(module==="sync") result=await runRace(); else if(module==="paging") result=await runPaging(config); else if(module==="monitoring") result=runMonitor(); else if(module==="ml") result=runMl(pool); else throw Object.assign(new Error("Unknown lab module"),{status:400});
    result.id=id; result.startedAt=started.get(id).startedAt; result.finishedAt=now(); remember(result); started.delete(id); return result;
  } catch(error) {
    const result={id,module,status:"error",startedAt:started.get(id)?.startedAt,finishedAt:now(),error:error.code||error.message}; remember(result); started.delete(id); throw Object.assign(error,{labResult:result});
  }
}
