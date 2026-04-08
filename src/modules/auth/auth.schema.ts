import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email")),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name is too long"),

    email: z.string().trim().toLowerCase().pipe(z.email("Invalid email")),

    password: z
      .string()
      .min(6, "Password must have at least 6 characters")
      .max(100, "Password is too long"),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;
