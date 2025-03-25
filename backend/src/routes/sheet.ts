import { Router } from "express";
import { addUser, getRecords, getUsers } from "../controllers/sheetController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

router.get("/getUsers", getUsers);
router.post("/addUsers", authMiddleware, addUser);
router.get("/getRecords", getRecords);
