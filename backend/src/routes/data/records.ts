import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  addRecord,
  getRanking,
  getRecords,
  getRecordsById,
} from "../../controllers/data/recordController";

export const router = Router();

router.get("/", getRecords);
router.get("/ranking", getRanking);
router.get("/:id(\\d+)", getRecordsById);

router.post("/", authMiddleware, addRecord);
