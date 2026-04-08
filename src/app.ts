import express from "express";

import "dotenv/config";

import authRoutes from "./modules/auth/auth.routes.ts";
import userRoutes from "./modules/users/users.routes.ts";
import tasksRoutes from "./modules/tasks/tasks.routes.ts";
import { pool } from "./config/database.ts";
import { errorHandler } from "./shared/middlewares/errorHandler.ts";
import { authMiddleware } from "./shared/middlewares/auth.ts";

const app = express();
app.use(express.json());

pool
  .connect()
  .then(() => console.log("Connected to the database successfully"))
  .catch((err) => console.error("Error connecting to the database \n", err));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", authMiddleware, tasksRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
