import { Router } from "express";
import {
  addRecord,
  addUser,
  getRanking,
  getRecords,
  getRecordsById,
  getUserById,
  getUsers,
} from "../controllers/dataController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);

router.get("/records", getRecords);
router.get("/records/:id", getRecordsById);
router.get("/ranking", getRanking);

router.post("/users", authMiddleware, addUser);
router.post("/records", authMiddleware, addRecord);
