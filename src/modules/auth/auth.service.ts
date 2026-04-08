import { pool } from "../../config/database.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../types/user.ts";

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
