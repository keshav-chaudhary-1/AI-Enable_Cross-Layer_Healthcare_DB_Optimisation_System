import { findPatientById } from "../models/patient.model.js";
import { findDoctorById, listDoctors } from "../models/doctor.model.js";
import {
  createAppointment,
  findAppointmentsForPatient,
  findAppointmentsForDoctor,
  updateAppointmentStatus,
  updateTreatmentStatus,
  findCurrentPatientsForDoctor,
  toSafeAppointment,
} from "../models/appointment.model.js";
import { encodeId, decodeId } from "../utils/id.js";

// Doctors a patient can choose from when booking.
export async function getDoctors(req, res, next) {
  try {
    const doctors = await listDoctors();
    res.json({
      doctors: doctors.map((d) => ({
        id: encodeId("DR", d.doctor_id),
        name: d.doctor_name,
        specialization: d.specialization,
        department: d.department_name || null,
      })),
    });
  } catch (err) {
    next(err);
  }
}

export async function bookAppointment(req, res, next) {
  try {
    if (req.userRole !== "patient") {
      return res.status(403).json({ message: "Only patients can book appointments." });
    }

    const patientId = decodeId("PT", req.userId);
    const patient = patientId ? await findPatientById(patientId) : null;
    if (!patient) {
      return res.status(401).json({ message: "Session expired. Please sign in again." });
    }

    const { doctorId, scheduledAt, reason } = req.body;

    if (!doctorId || !scheduledAt) {
      return res.status(400).json({ message: "A doctor and a date/time are required." });
    }

    const parsedDate = new Date(scheduledAt);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "That date/time isn't valid." });
    }
    if (parsedDate.getTime() < Date.now()) {
      return res.status(400).json({ message: "Please choose a date/time in the future." });
    }

    const numericDoctorId = decodeId("DR", doctorId);
    const doctor = numericDoctorId ? await findDoctorById(numericDoctorId) : null;
    if (!doctor) {
      return res.status(404).json({ message: "That doctor couldn't be found." });
    }

    const appointment = await createAppointment({
      patientId: patient.patient_id,
      doctorId: doctor.doctor_id,
      scheduledAt: parsedDate,
      status: "requested",
      reason,
    });

    const [withJoin] = (await findAppointmentsForPatient(patient.patient_id)).filter(
      (row) => row.appointment_id === appointment.appointment_id
    );

    res.status(201).json({ appointment: toSafeAppointment(withJoin, "patient") });
  } catch (err) {
    next(err);
  }
}

export async function listMyAppointments(req, res, next) {
  try {
    if (req.userRole === "doctor") {
      const doctorId = decodeId("DR", req.userId);
      const doctor = doctorId ? await findDoctorById(doctorId) : null;
      if (!doctor) {
        return res.status(401).json({ message: "Session expired. Please sign in again." });
      }
      const rows = await findAppointmentsForDoctor(doctor.doctor_id);
      return res.json({ appointments: rows.map((row) => toSafeAppointment(row, "doctor")) });
    }

    const patientId = decodeId("PT", req.userId);
    const patient = patientId ? await findPatientById(patientId) : null;
    if (!patient) {
      return res.status(401).json({ message: "Session expired. Please sign in again." });
    }
    const rows = await findAppointmentsForPatient(patient.patient_id);
    res.json({ appointments: rows.map((row) => toSafeAppointment(row, "patient")) });
  } catch (err) {
    next(err);
  }
}

export async function currentPatients(req, res, next) {
  try {
    if (req.userRole !== "doctor") return res.status(403).json({ message: "Only doctors can view current patients." });
    const doctorId = decodeId("DR", req.userId);
    const doctor = doctorId ? await findDoctorById(doctorId) : null;
    if (!doctor) return res.status(401).json({ message: "Session expired. Please sign in again." });
    const rows = await findCurrentPatientsForDoctor(doctor.doctor_id);
    res.json({
      patients: rows.map((row) => ({
        id: encodeId("PT", row.patient_id),
        name: row.patient_name,
        dob: row.date_of_birth,
        gender: row.gender,
        bloodGroup: row.blood_group,
        phone: row.phone,
        appointmentId: encodeId("APT", row.appointment_id),
        scheduledAt: row.appointment_date,
        reason: row.reason,
        treatmentStatus: row.treatment_status || "not_started",
      })),
    });
  } catch (err) {
    next(err);
  }
}

const DOCTOR_ALLOWED_STATUSES = ["confirmed", "cancelled", "completed"];
const PATIENT_ALLOWED_STATUSES = ["cancelled"];

export async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    const allowed = req.userRole === "doctor" ? DOCTOR_ALLOWED_STATUSES : PATIENT_ALLOWED_STATUSES;
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "That status change isn't allowed." });
    }

    const appointmentId = decodeId("APT", req.params.appointmentId);
    if (!appointmentId) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    let rows, perspective, ownId;
    if (req.userRole === "doctor") {
      const doctorId = decodeId("DR", req.userId);
      const doctor = doctorId ? await findDoctorById(doctorId) : null;
      if (!doctor) {
        return res.status(401).json({ message: "Session expired. Please sign in again." });
      }
      ownId = doctor.doctor_id;
      rows = await findAppointmentsForDoctor(ownId);
      perspective = "doctor";
    } else {
      const patientId = decodeId("PT", req.userId);
      const patient = patientId ? await findPatientById(patientId) : null;
      if (!patient) {
        return res.status(401).json({ message: "Session expired. Please sign in again." });
      }
      ownId = patient.patient_id;
      rows = await findAppointmentsForPatient(ownId);
      perspective = "patient";
    }

    const match = rows.find((row) => row.appointment_id === appointmentId);
    if (!match) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    if (req.userRole === "doctor" && status === "completed" && match.treatment_status !== "completed") {
      return res.status(400).json({ message: "Complete the treatment before closing the appointment." });
    }

    await updateAppointmentStatus(appointmentId, status);

    const refreshedRows =
      perspective === "doctor" ? await findAppointmentsForDoctor(ownId) : await findAppointmentsForPatient(ownId);
    const rejoined = refreshedRows.find((row) => row.appointment_id === appointmentId);

    res.json({ appointment: toSafeAppointment(rejoined, perspective) });
  } catch (err) {
    next(err);
  }
}

const TREATMENT_STATUSES = ["active", "completed"];

export async function updateTreatment(req, res, next) {
  try {
    if (req.userRole !== "doctor") return res.status(403).json({ message: "Only doctors can update treatment progress." });
    const { treatmentStatus } = req.body;
    if (!TREATMENT_STATUSES.includes(treatmentStatus)) return res.status(400).json({ message: "Invalid treatment status." });

    const appointmentId = decodeId("APT", req.params.appointmentId);
    const doctorId = decodeId("DR", req.userId);
    const doctor = doctorId ? await findDoctorById(doctorId) : null;
    if (!appointmentId || !doctor) return res.status(404).json({ message: "Appointment not found." });

    const rows = await findAppointmentsForDoctor(doctor.doctor_id);
    const match = rows.find((row) => row.appointment_id === appointmentId);
    if (!match) return res.status(404).json({ message: "Appointment not found." });
    if (match.status !== "confirmed") return res.status(400).json({ message: "Treatment can only be started for a confirmed appointment." });
    if (treatmentStatus === "active" && match.treatment_status === "completed") {
      return res.status(400).json({ message: "Completed treatment cannot be reopened." });
    }

    await updateTreatmentStatus(appointmentId, treatmentStatus);
    const refreshed = (await findAppointmentsForDoctor(doctor.doctor_id)).find((row) => row.appointment_id === appointmentId);
    res.json({ appointment: toSafeAppointment(refreshed, "doctor") });
  } catch (err) {
    next(err);
  }
}
