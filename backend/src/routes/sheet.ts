import { Router } from "express";
import { getRecords, getUsers } from "../controllers/sheetController";

export const router = Router();

router.get("/getUsers", getUsers);
router.get("/getRecords", getRecords);
