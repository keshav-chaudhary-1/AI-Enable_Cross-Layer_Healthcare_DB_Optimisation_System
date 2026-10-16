# Performance & OS Lab

The developer-only **Performance & OS Lab** is an executable extension of MedChart. It is available after signing in with the existing developer role and selecting **Performance & OS Lab** in the developer console.

## Safety and isolation

- Lab endpoints are protected by the existing JWT and `requireDeveloper` middleware.
- PostgreSQL experiments use the `medchart_perf_lab` schema and synthetic identifiers only. The application healthcare tables are not used by the experiments.
- Dataset, worker, memory and process workloads are bounded in code.
- The query lab uses reviewed SQL templates; the browser cannot submit arbitrary SQL.
- Results and structured history are bounded in memory. Reset clears lab history; experiment tables are retained so reruns are non-destructive.
- Errors and unsupported metrics are returned as state, not replaced by invented numbers.

## Modules

| Module | Evidence collected |
| --- | --- |
| SQL optimisation | PostgreSQL `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)`, planning/execution time, plan rows, actual rows, scan nodes and buffer values before/after an isolated index. |
| Deadlocks | Two independent pool connections, opposite `FOR UPDATE` lock order, event timestamps and PostgreSQL SQLSTATE `40P01` when detected. |
| ACID | Real rollback, `CHECK` constraint and committed-row visibility through a later pool query. |
| Worker threads | Sequential/parallel CPU timings, configurable bounded worker count and actual `worker_threads` IDs. |
| Processes | Child process PIDs and start/end timestamps, sequential/concurrent timings. |
| Scheduling | FCFS, SJF, priority and bounded Round Robin schedule metrics; explicitly a simulator, not a host scheduler change. |
| Synchronisation | Controlled lost-update workload followed by a promise-mutex critical section. |
| Virtual memory | Bounded synthetic file and page-sized sequential/random access timings. Portable Node APIs report page-fault counters as unavailable rather than guessing. |
| Monitoring | Host load/CPU-core count, RAM, process RSS/heap, PID and uptime. Disk counters are explicitly unavailable on platforms without a safe portable API. |
| ML prediction | Uses collected SQL lab history only. It reports insufficient data until the minimum real samples exist and does not claim OS features improve accuracy without a leakage-safe evaluation set. |

## Start and verify

```bash
cd medchart
npm install #if you already install npm not need to intall the environment ever time.
npm run build

cd server 
npm install #if you already install npm not need to intall the environment ever time.
npm run dev
```

The PostgreSQL-backed modules require the configured `DATABASE_URL` and a reachable PostgreSQL instance. If PostgreSQL is unavailable, the API returns the database error; worker, process, scheduling, synchronisation, paging and monitoring modules remain independently executable. Use the existing schema setup instructions in `medchart/README.md` for the healthcare database; the lab schema is created lazily and does not reset the application database.

## Viva mapping

- DBMS: query plans, index selectivity, joins/scans, two-phase locking, deadlock detection, ACID, serializability and recovery boundaries.
- OS: processes versus threads, CPU-bound parallelism, scheduling metrics, critical sections, virtual memory and resource monitoring.
- Engineering: protected API, correlation IDs from the existing query context, bounded history, cleanup, timeouts and honest unavailable/insufficient states.

The lab demonstrates PostgreSQL and the host operating system; it does not reimplement PostgreSQL WAL, the host page-replacement policy, or the host scheduler.
