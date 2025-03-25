import { Router } from "express";
import { googleCallback } from "../controllers/authController";
import passport from "passport";

export const router = Router();

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


