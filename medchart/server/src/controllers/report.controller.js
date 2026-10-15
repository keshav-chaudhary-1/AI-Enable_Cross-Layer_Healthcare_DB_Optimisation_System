import { findPatientById } from "../models/patient.model.js";
import { findDoctorById } from "../models/doctor.model.js";
import { findAppointmentById } from "../models/appointment.model.js";
import { createReport, findCurrentReportsForDoctor, findReportForAccess, findReportsForPatient, toSafeReport } from "../models/report.model.js";
import { decodeId } from "../utils/id.js";

const MAX_REPORT_BYTES = 10 * 1024 * 1024;

function currentUserId(req) {
  return req.userRole === "doctor" ? decodeId("DR", req.userId) : decodeId("PT", req.userId);
}

export async function listReports(req, res, next) {
  try {
    const id = currentUserId(req);
    if (!id) return res.status(401).json({ message: "Session expired. Please sign in again." });
    const rows = req.userRole === "doctor" ? await findCurrentReportsForDoctor(id) : await findReportsForPatient(id);
    res.json({ reports: rows.map(toSafeReport) });
  } catch (err) {
    next(err);
  }
}

export async function uploadReport(req, res, next) {
  try {
    if (req.userRole !== "patient") return res.status(403).json({ message: "Only patients can upload reports." });

    const patientId = currentUserId(req);
    const { appointmentId, fileName, mimeType, dataBase64, notes } = req.body;
    const numericAppointmentId = decodeId("APT", appointmentId);
    if (!patientId || !numericAppointmentId || !fileName || !mimeType || !dataBase64) {
      return res.status(400).json({ message: "Appointment, file name, type, and document data are required." });
    }

    const appointment = await findAppointmentById(numericAppointmentId);
    if (!appointment || appointment.patient_id !== patientId) return res.status(404).json({ message: "Appointment not found." });
    if (appointment.status !== "confirmed" || !["not_started", "active"].includes(appointment.treatment_status || "not_started")) {
      return res.status(400).json({ message: "Reports can only be added to a confirmed, ongoing appointment." });
    }

    const cleanBase64 = dataBase64.replace(/^data:[^;]+;base64,/, "");
    const documentData = Buffer.from(cleanBase64, "base64");
    if (!documentData.length || documentData.length > MAX_REPORT_BYTES) {
      return res.status(400).json({ message: "Report documents must be between 1 byte and 10 MB." });
    }

    const patient = await findPatientById(patientId);
    const report = await createReport({
      appointmentId: appointment.appointment_id,
      patientId,
      doctorId: appointment.doctor_id,
      fileName: fileName.trim().slice(0, 255),
      mimeType: mimeType.slice(0, 120),
      fileSize: documentData.length,
      documentData,
      notes,
    });
    res.status(201).json({ report: toSafeReport({ ...report, patient_name: patient?.patient_name }) });
  } catch (err) {
    next(err);
  }
}

export async function downloadReport(req, res, next) {
  try {
    const reportId = decodeId("RPT", req.params.reportId);
    const userId = currentUserId(req);
    if (!reportId || !userId) return res.status(404).json({ message: "Report not found." });
    const row = await findReportForAccess(reportId, req.userRole === "patient" ? { patientId: userId } : { doctorId: userId });
    if (!row) return res.status(404).json({ message: "Report not found or no longer available." });
    res.setHeader("Content-Type", row.mime_type);
    res.setHeader("Content-Length", row.file_size);
    res.setHeader("Content-Disposition", `inline; filename="${row.file_name.replace(/[^a-zA-Z0-9._-]/g, "_")}"`);
    res.send(row.document_data);
  } catch (err) {
    next(err);
  }
}
