import { Router } from "express";
import { commitScore } from "../controllers/commitScoreController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

router.post("/", authMiddleware, commitScore);
