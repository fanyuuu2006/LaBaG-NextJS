import { Router } from "express";

import {
  addRecord,
  getRanking,
  getRecords,
  getRecordsById,
} from "../../controllers/dataController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { nonceMiddleware } from "../../middlewares/nonceMiddleware";

export const router = Router();

router.get("/", getRecords);
router.get("/:id(\\d+)", getRecordsById);
router.get("/ranking", getRanking);

router.post("/", authMiddleware, nonceMiddleware, addRecord);
