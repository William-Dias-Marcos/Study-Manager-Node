import { Router } from "express";
import * as authController from "./auth.controller.ts";
import { validateBody } from "../../shared/middlewares/validate.ts";
import { registerSchema, loginSchema } from "./auth.schema.ts";

const router = Router();

router.post("/login", validateBody(loginSchema), authController.login);
router.post("/register", validateBody(registerSchema), authController.register);

export default router;
