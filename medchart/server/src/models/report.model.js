import { pool } from "../db.js";
import { encodeId } from "../utils/id.js";

const REPORT_COLUMNS = `
  r.report_id, r.appointment_id, r.patient_id, r.doctor_id,
  r.file_name, r.mime_type, r.file_size, r.notes, r.uploaded_at,
  p.patient_name, d.doctor_name, a.appointment_date, a.status, a.treatment_status
`;

export async function createReport({ appointmentId, patientId, doctorId, fileName, mimeType, fileSize, documentData, notes }) {
  const { rows } = await pool.query(
    `INSERT INTO report_document
      (appointment_id, patient_id, doctor_id, file_name, mime_type, file_size, document_data, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING report_id, appointment_id, patient_id, doctor_id, file_name, mime_type, file_size, notes, uploaded_at`,
    [appointmentId, patientId, doctorId, fileName, mimeType, fileSize, documentData, notes || null]
  );
  return rows[0];
}

export async function findReportsForPatient(patientId) {
  const { rows } = await pool.query(
    `SELECT ${REPORT_COLUMNS}
     FROM report_document r
     JOIN patient p ON p.patient_id = r.patient_id
     JOIN doctor d ON d.doctor_id = r.doctor_id
     JOIN appointment a ON a.appointment_id = r.appointment_id
     WHERE r.patient_id = $1
     ORDER BY r.uploaded_at DESC`,
    [patientId]
  );
  return rows;
}

export async function findCurrentReportsForDoctor(doctorId) {
  const { rows } = await pool.query(
    `SELECT ${REPORT_COLUMNS}
     FROM report_document r
     JOIN patient p ON p.patient_id = r.patient_id
     JOIN doctor d ON d.doctor_id = r.doctor_id
     JOIN appointment a ON a.appointment_id = r.appointment_id
     WHERE r.doctor_id = $1
       AND a.status = 'confirmed'
       AND a.treatment_status IN ('not_started', 'active')
     ORDER BY p.patient_name ASC, r.uploaded_at DESC`,
    [doctorId]
  );
  return rows;
}

export async function findReportForAccess(reportId, { patientId, doctorId }) {
  const accessColumn = patientId ? "r.patient_id" : "r.doctor_id";
  const accessId = patientId || doctorId;
  const { rows } = await pool.query(
    `SELECT r.report_id, r.file_name, r.mime_type, r.file_size, r.document_data
     FROM report_document r
     JOIN appointment a ON a.appointment_id = r.appointment_id
     WHERE r.report_id = $1 AND ${accessColumn} = $2
       AND ($3::INTEGER IS NULL OR (a.status = 'confirmed' AND a.treatment_status IN ('not_started', 'active')))` ,
    [reportId, accessId, doctorId || null]
  );
  return rows[0] ?? null;
}

export function toSafeReport(row) {
  return {
    id: encodeId("RPT", row.report_id),
    appointmentId: encodeId("APT", row.appointment_id),
    fileName: row.file_name,
    mimeType: row.mime_type,
    fileSize: row.file_size,
    notes: row.notes,
    uploadedAt: row.uploaded_at,
    patient: row.patient_id ? { id: encodeId("PT", row.patient_id), name: row.patient_name } : null,
    doctor: row.doctor_id ? { id: encodeId("DR", row.doctor_id), name: row.doctor_name } : null,
    scheduledAt: row.appointment_date,
    treatmentStatus: row.treatment_status,
    downloadPath: `/api/reports/${encodeId("RPT", row.report_id)}/document`,
  };
}
