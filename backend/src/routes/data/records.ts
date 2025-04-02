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
router.get("/ranking", getRanking);
router.get("/:id(\\d+)", getRecordsById);

router.post("/", authMiddleware, addRecord);
