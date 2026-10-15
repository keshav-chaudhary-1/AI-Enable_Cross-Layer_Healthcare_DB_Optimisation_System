import { pool } from "../db.js";

export async function findDepartmentByName(name) {
  const { rows } = await pool.query("SELECT * FROM department WHERE department_name = $1", [name]);
  return rows[0] ?? null;
}

export async function findDepartmentById(id) {
  const { rows } = await pool.query("SELECT * FROM department WHERE department_id = $1", [id]);
  return rows[0] ?? null;
}

// Departments are a normalized lookup table, so signup just needs a name —
// reuse the row if it exists, otherwise create it.
export async function findOrCreateDepartment(name) {
  if (!name || !name.trim()) return null;
  const clean = name.trim();

  const existing = await findDepartmentByName(clean);
  if (existing) return existing;

  try {
    const { rows } = await pool.query(
      `INSERT INTO department (department_name) VALUES ($1) RETURNING *`,
      [clean]
    );
    return rows[0];
  } catch (err) {
    // Race: another request created the same department between our SELECT and INSERT.
    if (err.code === "23505") return findDepartmentByName(clean);
    throw err;
  }
}
