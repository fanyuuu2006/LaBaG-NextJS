import { Router } from "express";
import { getUserProfile, googleCallback } from "../controllers/authController";
import passport from "passport";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

// 獲取用戶資料
router.get("/profile", authMiddleware, getUserProfile);

// Google OAuth 登入
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth 回呼
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);
