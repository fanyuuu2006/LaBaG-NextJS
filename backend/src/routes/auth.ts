import { Router } from "express";
import { getUserProfile, signCallBack, signOut } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  signCallBackMiddleware,
  signInMiddleware,
} from "../middlewares/signMiddleware";

export const router = Router();

// 獲取用戶資料
router.get("/profile", authMiddleware, getUserProfile);

// Google 回呼
router.get("/callback/:signBy", signCallBackMiddleware, signCallBack);

router.get("/:signBy", signInMiddleware);

router.get("/signOut", authMiddleware, signOut);

