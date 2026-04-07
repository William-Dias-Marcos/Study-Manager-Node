import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name is too long"),

    email: z.email({ message: "Invalid email" }),

    password: z
      .string()
      .min(6, "Password must have at least 6 characters")
      .max(100, "Password is too long"),
  })
  .strict();
