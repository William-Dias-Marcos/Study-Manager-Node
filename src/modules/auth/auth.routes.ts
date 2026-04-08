import { Router } from "express";
import { loginUser } from "./auth.controller.ts";
import { validateBody } from "../../middlewares/validate.ts";
import { loginSchema } from "./auth.schema.ts";

const router = Router();

router.post("/", validateBody(loginSchema), loginUser);

export default router;
