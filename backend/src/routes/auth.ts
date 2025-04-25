import { Router } from "express";
import { getUserProfile, signCallBack } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  signCallBackMiddleware,
  signInMiddleware,
} from "../middlewares/signMiddleware";

export const router = Router();

// 獲取用戶資料
router
  .get("/profile", authMiddleware, getUserProfile)

  // Google 回呼
  .get("/callback/:signBy", signCallBackMiddleware, signCallBack)

  .get("/:signBy", signInMiddleware);
