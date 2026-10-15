import { pool } from "../db.js";
import { encodeId } from "../utils/id.js";

export async function findPatientByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM patient WHERE email = $1", [email]);
  return rows[0] ?? null;
}

export async function findPatientById(id) {
  const { rows } = await pool.query("SELECT * FROM patient WHERE patient_id = $1", [id]);
  return rows[0] ?? null;
}

export async function createPatient({ name, email, passwordHash, dob, gender, bloodGroup, phone }) {
  const { rows } = await pool.query(
    `INSERT INTO patient (patient_name, email, password_hash, date_of_birth, gender, blood_group, phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, email, passwordHash, dob || null, gender || null, bloodGroup || null, phone || null]
  );
  return rows[0];
}

// Strips the password hash and reshapes the row for the client.
export function toSafePatient(row) {
  return {
    id: encodeId("PT", row.patient_id),
    name: row.patient_name,
    email: row.email,
    role: "patient",
    dob: row.date_of_birth,
    gender: row.gender,
    bloodGroup: row.blood_group,
    phone: row.phone,
  };
}
