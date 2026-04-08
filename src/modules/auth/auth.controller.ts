import { Request, Response } from "express";
import * as authService from "./auth.service.ts";
import { LoginInput, RegisterInput } from "./auth.schema.ts";

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.json(result);
  } catch (err: any) {
    return res.status(401).json({
      message: err.message || "Invalid credentials",
    });
  }
};

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.register(name, email, password);

    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Error creating user",
    });
  }
};
