import { Router } from "express";
import {
  addRecord,
  addUser,
  getRanking,
  getRecords,
  getUsers,
} from "../controllers/dataController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

router.get("/getUsers", getUsers);
router.post("/addUser", authMiddleware, addUser);
router.get("/getRecords", getRecords);
router.get("/getRanking", getRanking);
router.post("/addRecord",authMiddleware, addRecord);
