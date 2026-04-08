import { Request, Response } from "express";
import * as authService from "./auth.service.ts";
import { loginInput } from "./auth.schema.ts";

export const loginUser = async (
  req: Request<{}, {}, loginInput>,
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
