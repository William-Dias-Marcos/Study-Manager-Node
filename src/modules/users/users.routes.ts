import { Router } from "express";

const userRoutes = Router();

// GET all users
userRoutes.get("/", (req, res) => {
  res.json({ message: "Get all users" });
});

// GET user by ID
userRoutes.get("/:id", (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

// POST create user
userRoutes.post("/", (req, res) => {
  res.json({ message: "Create user" });
});

// PUT update user
userRoutes.put("/:id", (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
});

// DELETE user
userRoutes.delete("/:id", (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

export default userRoutes;
