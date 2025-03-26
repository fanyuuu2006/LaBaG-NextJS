import { Router } from "express";
import { getUserProfile, githubCallback, googleCallback } from "../controllers/authController";
import passport from "passport";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

// 獲取用戶資料
router.get("/profile", authMiddleware, getUserProfile);

// Google 登入
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google 回呼
router.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  googleCallback
);

// GitHub 登入
router.get("/github", passport.authenticate("github", { scope: ["profile", "email"] }));


// GitHub 回呼
router.get(
  "/callback/github",
  passport.authenticate("github", { session: false }),
  githubCallback
);

