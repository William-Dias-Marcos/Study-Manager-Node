import { Router } from "express";

const tasksRoutes = Router();

// GET all tasks
tasksRoutes.get("/", (req, res) => {
  res.json({ message: "Get all tasks" });
});

export default tasksRoutes;
