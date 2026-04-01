import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),

    email: z.email({ message: "Email inválido" }),

    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  })
  .strict();
