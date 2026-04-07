import { Router } from "express";
import * as usersController from "./users.controller.ts";
import { validateBody } from "../../middlewares/validate.ts";
import { createUserSchema } from "./users.schema.ts";

const router = Router();

router.get("/", usersController.getAllUsers);
router.post("/", validateBody(createUserSchema), usersController.createNewUser);

export default router;
