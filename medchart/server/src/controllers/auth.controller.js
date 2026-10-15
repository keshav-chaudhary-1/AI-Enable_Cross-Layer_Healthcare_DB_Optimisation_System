import bcrypt from "bcryptjs";
import {
  findPatientByEmail,
  findPatientById,
  createPatient,
  toSafePatient,
} from "../models/patient.model.js";
import {
  findDoctorByEmail,
  findDoctorById,
  createDoctor,
  toSafeDoctor,
} from "../models/doctor.model.js";
import { findOrCreateDepartment } from "../models/department.model.js";
import { decodeId } from "../utils/id.js";
import { signSession } from "../utils/jwt.js";

export async function signup(req, res, next) {
  try {
    const { name, email, password, role, dob, gender, bloodGroup, phone, specialization, department } =
      req.body;
    const cleanEmail = (email || "").trim().toLowerCase();

    if (!name?.trim() || !cleanEmail || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }
    if (!["patient", "doctor"].includes(role)) {
      return res.status(400).json({ message: "Role must be 'patient' or 'doctor'." });
    }

    // patient and doctor are separate tables, so check both for a clash.
    const existing =
      (await findPatientByEmail(cleanEmail)) || (await findDoctorByEmail(cleanEmail));
    if (existing) {
      return res.status(409).json({ message: "An account already exists with that email." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let safeUser;
    if (role === "patient") {
      const patient = await createPatient({
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        dob,
        gender,
        bloodGroup,
        phone,
      });
      safeUser = toSafePatient(patient);
    } else {
      const dept = await findOrCreateDepartment(department);
      const doctor = await createDoctor({
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        specialization,
        departmentId: dept?.department_id,
      });
      safeUser = toSafeDoctor({ ...doctor, department_name: dept?.department_name });
    }

    const token = signSession(safeUser);
    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || "").trim().toLowerCase();

    if (
      cleanEmail === (process.env.DEVELOPER_EMAIL || "developer@example.com").toLowerCase() &&
      password === (process.env.DEVELOPER_PASSWORD || "developer@123DEBdev")
    ) {
      const developer = { id: "DEV-1001", name: "Developer Console", email: process.env.DEVELOPER_EMAIL || "developer@example.com", role: "developer" };
      return res.json({ user: developer, token: signSession(developer) });
    }

    const patient = await findPatientByEmail(cleanEmail);
    const account = patient || (await findDoctorByEmail(cleanEmail));

    if (!account) {
      return res.status(401).json({ message: "No matching account found." });
    }

    const matches = await bcrypt.compare(password || "", account.password_hash || "");
    if (!matches) {
      return res.status(401).json({ message: "No matching account found." });
    }

    const safeUser = patient ? toSafePatient(account) : toSafeDoctor(account);
    const token = signSession(safeUser);
    res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    if (req.userRole === "developer") {
      return res.json({ user: { id: req.userId, name: "Developer Console", email: process.env.DEVELOPER_EMAIL || "developer@example.com", role: "developer" } });
    }
    if (req.userRole === "doctor") {
      const numericId = decodeId("DR", req.userId);
      const doctor = numericId ? await findDoctorById(numericId) : null;
      if (!doctor) {
        return res.status(401).json({ message: "Session expired. Please sign in again." });
      }
      return res.json({ user: toSafeDoctor(doctor) });
    }

    const numericId = decodeId("PT", req.userId);
    const patient = numericId ? await findPatientById(numericId) : null;
    if (!patient) {
      return res.status(401).json({ message: "Session expired. Please sign in again." });
    }
    res.json({ user: toSafePatient(patient) });
  } catch (err) {
    next(err);
  }
}
