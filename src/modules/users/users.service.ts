import { pool } from "../../config/database.ts";

export const getUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<{ id: string }> => {
  const query = `
    INSERT INTO users (name, email, password, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id;
  `;
  const { rows } = await pool.query(query, [name, email, password]);
  return rows[0];
};
