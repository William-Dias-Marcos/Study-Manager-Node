import { pool } from "../../config/database.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../shared/types/user.ts";

const SALT_ROUNDS = 10;

export const login = async (email: string, password: string) => {
  const { rows } = await pool.query<User>(
    "SELECT id, name, email, password, created_at, validated_at FROM users WHERE email = $1 AND (validated_at IS NULL OR validated_at > NOW())",
    [email],
  );

  const user = rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, username: user.name, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    },
  );

  return { token };
};

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<{ id: string }> => {
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const query = `
    INSERT INTO users (name, email, password, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id;
  `;

  const { rows } = await pool.query(query, [name, email, hashedPassword]);
  return rows[0];
};
