-- Run this against your existing healthcare_db to add login support:
--   docker exec -i healthcare_postgres psql -U postgres -d healthcare_db < sql/schema.sql
-- or, from your Mac (if the port is exposed to localhost):
--   psql -h localhost -U postgres -d healthcare_db -f sql/schema.sql
--
-- Every statement below is safe to run more than once. It only ADDS things
-- (columns, tables, indexes) to your existing patient/doctor/appointment/
-- department schema — it never drops or rewrites data you already have.

-- These tables define the baseline shape (matches what's already in your
-- healthcare_db per pg_dump). CREATE TABLE IF NOT EXISTS is a no-op against
-- your existing tables — this just means the file also works from scratch.
CREATE TABLE IF NOT EXISTS department (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS patient (
  patient_id SERIAL PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(20),
  blood_group VARCHAR(10),
  phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS doctor (
  doctor_id SERIAL PRIMARY KEY,
  doctor_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  department_id INTEGER REFERENCES department(department_id)
);

CREATE TABLE IF NOT EXISTS appointment (
  appointment_id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patient(patient_id),
  doctor_id INTEGER NOT NULL REFERENCES doctor(doctor_id),
  appointment_date TIMESTAMP NOT NULL,
  status VARCHAR(30)
);

-- The appointment table as dumped from healthcare_db has no place to store
-- why a patient is booking — add one column for it (safe no-op if present).
ALTER TABLE appointment ADD COLUMN IF NOT EXISTS reason TEXT;
ALTER TABLE appointment ADD COLUMN IF NOT EXISTS treatment_status VARCHAR(20) NOT NULL DEFAULT 'not_started';

-- Uploaded clinical reports are linked to the appointment that opened the
-- treatment relationship. The file itself stays in PostgreSQL as BYTEA so
-- access can be authorized through the same API as the rest of the app.
CREATE TABLE IF NOT EXISTS report_document (
  report_id SERIAL PRIMARY KEY,
  appointment_id INTEGER NOT NULL REFERENCES appointment(appointment_id) ON DELETE CASCADE,
  patient_id INTEGER NOT NULL REFERENCES patient(patient_id) ON DELETE CASCADE,
  doctor_id INTEGER NOT NULL REFERENCES doctor(doctor_id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  file_size INTEGER NOT NULL,
  document_data BYTEA NOT NULL,
  notes TEXT,
  uploaded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Login credentials for patients. Existing patient rows will have these as
-- NULL until they sign up through the app, or you backfill them yourself.
ALTER TABLE patient ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE;
ALTER TABLE patient ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE patient ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();

-- Login credentials for doctors.
ALTER TABLE doctor ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE;
ALTER TABLE doctor ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE doctor ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_patient_email ON patient (email);
CREATE INDEX IF NOT EXISTS idx_doctor_email ON doctor (email);
CREATE INDEX IF NOT EXISTS idx_appointment_patient ON appointment (patient_id);
CREATE INDEX IF NOT EXISTS idx_appointment_doctor ON appointment (doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointment_current_treatment ON appointment (doctor_id, status, treatment_status);
CREATE INDEX IF NOT EXISTS idx_report_appointment ON report_document (appointment_id);
CREATE INDEX IF NOT EXISTS idx_report_patient ON report_document (patient_id);
CREATE INDEX IF NOT EXISTS idx_report_doctor ON report_document (doctor_id);
