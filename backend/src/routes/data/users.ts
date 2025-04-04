import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  addUser,
  changeUserData,
  getUserById,
  getUsers,
} from "../../controllers/data/userController";

export const router = Router();

router
  .get("/", getUsers)
  .get("/:id(\\d+)", getUserById)

  .post("/", authMiddleware, addUser)

  .patch("/", authMiddleware, changeUserData);
