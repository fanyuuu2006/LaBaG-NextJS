import { Router } from "express";
import { addUser, getRecords, getUsers } from "../controllers/dataController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

router.get("/getUsers", getUsers);
router.post("/addUser", authMiddleware, addUser);
router.get("/getRecords", getRecords);
