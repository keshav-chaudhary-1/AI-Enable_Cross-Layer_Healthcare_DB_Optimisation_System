import { pool } from "../db.js";
import { encodeId } from "../utils/id.js";

export async function createAppointment({ patientId, doctorId, scheduledAt, status, reason }) {
  const { rows } = await pool.query(
    `INSERT INTO appointment (patient_id, doctor_id, appointment_date, status, reason, treatment_status)
     VALUES ($1, $2, $3, $4, $5, 'not_started')
     RETURNING *`,
    [patientId, doctorId, scheduledAt, status, reason || null]
  );
  return rows[0];
}

export async function findAppointmentById(appointmentId) {
  const { rows } = await pool.query("SELECT * FROM appointment WHERE appointment_id = $1", [appointmentId]);
  return rows[0] ?? null;
}

// Appointments for a patient, with the doctor's (and department's) details joined in.
export async function findAppointmentsForPatient(patientId) {
  const { rows } = await pool.query(
    `SELECT a.*,
            d.doctor_id AS other_id,
            d.doctor_name AS other_name,
            d.specialization,
            dept.department_name
     FROM appointment a
     JOIN doctor d ON d.doctor_id = a.doctor_id
     LEFT JOIN department dept ON dept.department_id = d.department_id
     WHERE a.patient_id = $1
     ORDER BY a.appointment_date ASC`,
    [patientId]
  );
  return rows;
}

// Appointments for a doctor, with the patient's details joined in.
export async function findAppointmentsForDoctor(doctorId) {
  const { rows } = await pool.query(
    `SELECT a.*,
            p.patient_id AS other_id,
            p.patient_name AS other_name,
            p.date_of_birth
     FROM appointment a
     JOIN patient p ON p.patient_id = a.patient_id
     WHERE a.doctor_id = $1
     ORDER BY a.appointment_date ASC`,
    [doctorId]
  );
  return rows;
}

export async function findCurrentPatientsForDoctor(doctorId) {
  const { rows } = await pool.query(
    `SELECT a.appointment_id, a.appointment_date, a.status, a.treatment_status, a.reason,
            p.patient_id, p.patient_name, p.date_of_birth, p.gender, p.blood_group, p.phone
     FROM appointment a
     JOIN patient p ON p.patient_id = a.patient_id
     WHERE a.doctor_id = $1
       AND a.status = 'confirmed'
       AND a.treatment_status IN ('not_started', 'active')
     ORDER BY a.treatment_status DESC, a.appointment_date ASC`,
    [doctorId]
  );
  return rows;
}

export async function updateAppointmentStatus(appointmentId, status) {
  const { rows } = await pool.query(
    `UPDATE appointment SET status = $2 WHERE appointment_id = $1 RETURNING *`,
    [appointmentId, status]
  );
  return rows[0] ?? null;
}

export async function updateTreatmentStatus(appointmentId, treatmentStatus) {
  const { rows } = await pool.query(
    `UPDATE appointment
     SET treatment_status = $2::VARCHAR,
         status = CASE WHEN $2::VARCHAR = 'completed' THEN 'completed' ELSE status END
     WHERE appointment_id = $1 RETURNING *`,
    [appointmentId, treatmentStatus]
  );
  return rows[0] ?? null;
}

// Shapes a joined row for the client. `perspective` is the viewer's own role:
// a patient sees the doctor they booked, a doctor sees the patient who booked.
export function toSafeAppointment(row, perspective) {
  const base = {
    id: encodeId("APT", row.appointment_id),
    scheduledAt: row.appointment_date,
    reason: row.reason,
    status: row.status || "requested",
    treatmentStatus: row.treatment_status || "not_started",
  };

  if (perspective === "patient") {
    return {
      ...base,
      doctor: {
        id: encodeId("DR", row.other_id),
        name: row.other_name,
        specialization: row.specialization,
        department: row.department_name || null,
      },
    };
  }

  return {
    ...base,
    patient: {
      id: encodeId("PT", row.other_id),
      name: row.other_name,
      dob: row.date_of_birth,
    },
  };
}
