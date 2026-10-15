import { pool } from "../db.js";
import { encodeId } from "../utils/id.js";

export async function findDoctorByEmail(email) {
  const { rows } = await pool.query(
    `SELECT d.*, dept.department_name
     FROM doctor d
     LEFT JOIN department dept ON dept.department_id = d.department_id
     WHERE d.email = $1`,
    [email]
  );
  return rows[0] ?? null;
}

export async function findDoctorById(id) {
  const { rows } = await pool.query(
    `SELECT d.*, dept.department_name
     FROM doctor d
     LEFT JOIN department dept ON dept.department_id = d.department_id
     WHERE d.doctor_id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function listDoctors() {
  const { rows } = await pool.query(
    `SELECT d.*, dept.department_name
     FROM doctor d
     LEFT JOIN department dept ON dept.department_id = d.department_id
     ORDER BY d.doctor_name ASC`
  );
  return rows;
}

export async function createDoctor({ name, email, passwordHash, specialization, departmentId }) {
  const { rows } = await pool.query(
    `INSERT INTO doctor (doctor_name, email, password_hash, specialization, department_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, passwordHash, specialization || null, departmentId || null]
  );
  return rows[0];
}

// Strips the password hash and reshapes the row for the client.
export function toSafeDoctor(row) {
  return {
    id: encodeId("DR", row.doctor_id),
    name: row.doctor_name,
    email: row.email,
    role: "doctor",
    specialization: row.specialization,
    department: row.department_name || null,
  };
}
