import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { addUser, getUserById, getUsers } from "../../controllers/data/userController";

export const router = Router();

router.get("/", getUsers);
router.get("/:id(\\d+)", getUserById);

router.post("/", authMiddleware, addUser);
