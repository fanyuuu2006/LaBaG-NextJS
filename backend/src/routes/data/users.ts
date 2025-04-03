import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  addUser,
  changeUserData,
  getUserById,
  getUsers,
} from "../../controllers/data/userController";

export const router = Router();

router.get("/", getUsers);
router.get("/:id(\\d+)", getUserById);

router.post("/", authMiddleware, addUser);

router.patch("/", authMiddleware, changeUserData);
