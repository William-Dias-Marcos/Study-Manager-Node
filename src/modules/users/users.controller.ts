import { Request, Response } from "express";
import * as userService from "./users.service.ts";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const createNewUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await userService.createUser(name, email, password);
  res.status(201).json(user);
};
