import express from "express";

import "dotenv/config";

import userRoutes from "./modules/users/users.routes.js";
import tasksRoutes from "./modules/tasks/tasks.routes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", tasksRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
