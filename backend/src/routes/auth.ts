import { Router } from "express";
import {
  getUserProfile,
  signInCallBack,
  signOut,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  signInCallBackMiddleware,
  signInMiddleware,
} from "../middlewares/signMiddleware";

export const router = Router();

// 獲取用戶資料
router
  .get("/profile", authMiddleware, getUserProfile)

  // Google 回呼
  .get("/callback/:signBy", signInCallBackMiddleware, signInCallBack)

  .get("/:signBy", signInMiddleware)

  .get("/signOut", signOut);
