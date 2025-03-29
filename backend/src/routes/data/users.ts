import { Router } from "express";
import {
  addUser,
  getUserById,
  getUsers,
} from "../../controllers/dataController";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/", authMiddleware, addUser);
