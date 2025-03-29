import { Router } from "express";

import {
  addRecord,
  getRanking,
  getRecords,
  getRecordsById,
} from "../../controllers/dataController";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const router = Router();

router.get("/", getRecords);
router.get("/:id", getRecordsById);
router.get("/ranking", getRanking);

router.post("/", authMiddleware, addRecord);
