import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  addRecord,
  getRanking,
  getRecords,
  getRecordsById,
} from "../../controllers/data/recordController";
import { recordsPostRateLimit } from "../../middlewares/rateLimitMiddleware";

export const router = Router();

router
  .get("/", getRecords)
  .get("/ranking", getRanking)
  .get("/:id(\\d+)", getRecordsById)

  .post("/", authMiddleware, recordsPostRateLimit, addRecord);
