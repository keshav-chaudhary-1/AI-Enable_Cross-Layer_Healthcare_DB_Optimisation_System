# MedChart — Phase 1

Frontend + backend scaffold: a Get Started page with login/signup, routing
signed-in users to a Patient profile or a Doctor profile based on the role
they chose at signup. Accounts and appointments are stored in your existing
`healthcare_db` PostgreSQL database (passwords hashed with bcrypt), and
sessions persist across page refreshes using a JWT saved in the browser.

Also includes appointment booking: patients can request a time with a
doctor, and doctors can confirm, decline, start active treatment, and complete
treatment. Patients can upload clinical report documents to a confirmed
appointment, and doctors can view reports for their current patients.

**Note on the database:** this app runs against `healthcare_db`'s existing
`patient` / `doctor` / `department` / `appointment` tables (created outside
this project) — it does **not** create its own `users` table. Those tables
had no login system, so `sql/schema.sql` adds a few columns (`email`,
`password_hash`, `created_at` on `patient` and `doctor`; `reason` on
`appointment`) without touching anything already in there. `diagnosis`,
`lab_report`, `medication`, `prescription`, and `treatment` also exist in
`healthcare_db` but aren't wired into the app yet — the new `report_document`
table provides the first connected clinical document workflow.

## Project layout

```
medchart/
├── src/            # React frontend (Vite)
└── server/         # Express + PostgreSQL backend
```

## 1. Point this app at your existing healthcare_db

This assumes `healthcare_db` is already running in your `healthcare_postgres`
Docker container (as it is on your machine). Add the login columns, treatment
status, and report document table to your existing tables:

```bash
cd server
docker exec -i healthcare_postgres psql -U postgres -d healthcare_db < sql/schema.sql
```

If port 5432 is published to your Mac, you can run this from your host
`psql` instead:

```bash
psql -h localhost -p 5432 -U postgres -d healthcare_db -f sql/schema.sql
```

This is safe to run more than once — every statement uses `IF NOT EXISTS` /
`ADD COLUMN IF NOT EXISTS`, so it never drops or overwrites your existing
`patient`, `doctor`, `department`, or `appointment` rows.

## 2. Configure and run the backend

```bash
cd server
cp .env.example .env
# set DATABASE_URL to point at healthcare_db — see the comment in .env.example
# also set JWT_SECRET to any long random string — it's used to sign sessions
npm install
npm run dev
```

You should see: `MedChart API listening on http://localhost:5000`

Check it's alive: open `http://localhost:5000/api/health` in a browser —
you should see `{"status":"ok"}`.

## 3. Configure and run the frontend

In a second terminal, from the project root:

```bash
cp .env.example .env
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). Sign up as a
patient or doctor — this inserts a new row into `patient` or `doctor` in
`healthcare_db`, and logging in re-checks it against the database.

## Developer query console

Use the local developer account to open the DBMS observability dashboard:

```text
Email: developer@example.com
Password: developer@123DEBdev

### Active query optimizer

The developer console now separates three DBMS layers:

- PostgreSQL's own planner produces the baseline `EXPLAIN (FORMAT JSON)` plan.
- The project optimizer generates safe rewrite candidates and index candidates, then compares candidate plan costs.
- An index is never created automatically. A developer must press **Approve index**; the server validates the table and columns against the MedChart schema before running `CREATE INDEX IF NOT EXISTS`.

`ENABLE_ACTIVE_QUERY_REWRITE=false` is the safe default. Set it to `true` only in a development/demo environment when you want a candidate with a lower estimated cost to be used for that SELECT execution. The rewrite allow-list currently covers explicit projections for the `patient`, `doctor`, and `department` tables; it does not accept SQL from the browser and it never rewrites writes or locking reads.

Query parameter values are retained only in backend memory for the lifetime of the query log and are not returned to the developer dashboard. This prevents passwords and report-related values from appearing in the observability UI.
```

The developer dashboard displays live parameterized SQL templates from the
actual PostgreSQL query path, with route, actor, row count, success/failure,
execution time, average latency, and slow-query indicators. Query parameter
values are intentionally not displayed because they may contain credentials
or healthcare data. The console keeps the latest 250 in-memory query events
for the running backend process.

Note: any `patient`/`doctor` rows that existed in `healthcare_db` *before*
this app was connected won't have an `email`/`password_hash` yet, so they
can't log in until you either sign them up fresh (which will collide on
name, not email, so that's fine) or backfill those two columns yourself.

## Folder structure

```
server/
├── sql/schema.sql                     # adds login columns to patient/doctor,
│                                       # a reason column to appointment
└── src/
    ├── index.js                       # Express app entry point
    ├── db.js                          # PostgreSQL connection pool
    ├── routes/
    │   ├── auth.routes.js             # /api/auth/signup, /api/auth/login, /api/auth/me
    │   └── appointment.routes.js      # /api/appointments/*
    ├── controllers/
    │   ├── auth.controller.js         # checks patient + doctor tables for login
    │   └── appointment.controller.js
    ├── models/
    │   ├── patient.model.js           # SQL queries for the patient table
    │   ├── doctor.model.js            # SQL queries for the doctor table (+ department join)
    │   ├── department.model.js        # find-or-create by name, used at doctor signup
    │   └── appointment.model.js       # SQL queries for the appointment table
    ├── middleware/
    │   ├── errorHandler.js
    │   └── requireAuth.js             # verifies the JWT on protected routes
    └── utils/
        ├── jwt.js                     # sign/verify session tokens (payload: { sub, role })
        └── id.js                      # PT-1001 / DR-1002 / APT-1003 <-> real integer ids

src/
├── main.jsx                     # mounts <App /> into #root
├── App.jsx                      # top-level routing: GetStarted vs profiles
├── config.js                    # API base URL
├── api/
│   ├── authApi.js               # fetch calls to the auth backend
│   └── appointmentsApi.js       # fetch calls to the appointments backend
├── hooks/
│   ├── useAuth.js               # calls authApi, holds currentUser/error/loading,
│   │                             # restores session from a saved token on load
│   └── useAppointments.js       # loads "my appointments" (+ doctor list), book/setStatus
├── utils/
│   ├── helpers.js               # initials(), age(), formatDateTime()
│   └── session.js               # reads/writes the session token in localStorage
├── styles/
│   ├── variables.css            # design tokens (colors, fonts)
│   └── global.css               # base resets, imported once in main.jsx
├── components/
│   ├── common/
│   │   ├── Field.jsx            # labeled input wrapper
│   │   ├── Field.css
│   │   ├── SessionLoading.jsx   # shown briefly while a saved session is verified
│   │   └── SessionLoading.css
│   ├── icons/
│   │   ├── PulseMark.jsx        # small logo mark
│   │   ├── PulseLine.jsx        # animated heartbeat line
│   │   └── PulseLine.css
│   ├── auth/
│   │   ├── GetStarted.jsx       # combines Hero + AuthForm
│   │   ├── GetStarted.css
│   │   ├── Hero.jsx             # left-side branding panel
│   │   ├── Hero.css
│   │   ├── AuthForm.jsx         # login/signup tabs + fields
│   │   ├── AuthForm.css
│   │   ├── RoleSelector.jsx     # Patient / Doctor badge toggle
│   │   └── RoleSelector.css
│   ├── profile/
│   │   ├── ProfileShell.jsx     # shared header (avatar, id, logout)
│   │   ├── ProfileShell.css
│   │   ├── ChartCard.jsx        # titled card wrapper
│   │   ├── ChartRow.jsx         # label/value row
│   │   ├── Profile.css          # shared grid/card/row styles
│   │   ├── PatientProfile.jsx
│   │   └── DoctorProfile.jsx
│   └── appointments/
│       ├── AppointmentsCard.jsx      # list + role-aware controls, used in both profiles
│       ├── AppointmentRow.jsx        # one row: other party, time, reason, status, actions
│       ├── BookAppointmentModal.jsx  # patient-only booking form
│       └── Appointments.css
```

## Appointment booking

- **Patients** see an "Upcoming appointments" card on their profile with a
  **Book appointment** button. Booking opens a modal to pick a doctor, a
  date/time, and an optional reason — this creates an appointment with
  status `requested`.
- **Doctors** see all appointments booked with them and can **Confirm** or
  **Decline** a requested appointment, and later **Mark done** once it's
  `confirmed`.
- **Patients** can cancel an appointment they booked as long as it's still
  `requested` or `confirmed`.
- Status flow: `requested` → `confirmed` → `completed`, with `cancelled`
  reachable from either of the first two states.
- Treatment flow: `not_started` → `active` → `completed`. Doctors can start
  treatment after confirming an appointment; completing treatment closes the
  appointment.
- Patients can upload report documents up to 10 MB against confirmed
  appointments. Doctors see reports only for current patients: confirmed
  appointments whose treatment is `not_started` or `active`.

API (all under `/api/appointments`, all require the `Authorization: Bearer
<token>` header):

| Method | Path                        | Who        | What                                  |
| ------ | --------------------------- | ---------- | -------------------------------------- |
| GET    | `/doctors`                  | any        | list doctors, for the booking picker   |
| GET    | `/`                         | any        | "my" appointments (role-aware)         |
| POST   | `/`                         | patient    | book a new appointment                 |
| PATCH  | `/:appointmentId/status`    | patient/dr | update status (see rules above)        |
| PATCH  | `/:appointmentId/treatment` | doctor     | set treatment to `active`/`completed` |

Reports API (all routes require the `Authorization: Bearer <token>` header):

| Method | Path                              | Who     | What                                      |
| ------ | --------------------------------- | ------- | ----------------------------------------- |
| GET    | `/api/reports`                    | any     | own reports or current doctor reports     |
| POST   | `/api/reports`                    | patient | upload a report to a confirmed appointment |
| GET    | `/api/reports/:reportId/document` | any     | authorized document download              |

## How session persistence works

- On signup/login, the backend signs a JWT (`server/src/utils/jwt.js`)
  containing the user's display id and role, and returns it alongside the
  user.
- The frontend saves that token in `localStorage` (`src/utils/session.js`)
  and calls `GET /api/auth/me` with it on every page load to re-fetch the
  current user (`src/hooks/useAuth.js`).
- Logging out clears the stored token.
- Tokens expire after 7 days (`EXPIRES_IN` in `server/src/utils/jwt.js`).

## Display ids (PT-1001 / DR-1002 / APT-1003)

`patient`, `doctor`, and `appointment` use plain integer primary keys
(`patient_id`, `doctor_id`, `appointment_id`) with no separate "display id"
column. `server/src/utils/id.js` converts between those integers and the
`PT-`/`DR-`/`APT-` style ids shown in the UI (offsetting by 1000, e.g.
`patient_id = 1` becomes `PT-1001`) — nothing is stored differently, it's
just presentation.

## Next phases

- Diagnosis / lab report views, reading from the `diagnosis` and
  `lab_report` tables that already exist in `healthcare_db`
- Prescriptions and treatment history (`prescription`, `treatment`,
  `medication` tables), likely shown on the patient profile
- A "today's schedule" view for doctors, instead of the full chronological
  appointment list
