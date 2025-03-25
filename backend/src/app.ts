import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

import { GetSheetDatas } from "./routes/GetSheetDatas";
import { CommitScore } from "./routes/CommitScore"; // 請確保導入正確的路徑

const app = express();

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 分鐘
    max: 20, // 最多請求 20次
    message: { message: "請求過於頻繁，請稍後再試" },
  })
);

app.use(
  cors({
    origin: [process.env.WEBSITE_URL as string],
    methods: ["GET", "POST"],
    credentials: true, // 允許 Cookie
    allowedHeaders: ["Content-Type", "cookie", "referer"], // 允許 Referer 和 Cookies
    exposedHeaders: ["referer", "Set-Cookie"], // 允許在前端讀取 Referer 和 Cookie
  })
);

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// 設置中介軟體，解析 JSON 請求體
app.use(express.json());

app.get("/test", (_, res) => {
  res.send("The server is up and running!");
});

// 產生 Google 登入 URL
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); // 要求 Google 提供 使用者名稱 和 Email。

// Google 回呼 API
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }), // 表示不使用 Express session
  (req, res) => {
    const user = req.user as Profile;
    const token = jwt.sign(
      { id: user?.id, name: user?.displayName, email: user?.emails?.[0].value },
      process.env.JWT_KEY ?? "",
      { expiresIn: "1h" }
    );

    // 前端可從這裡取得 token
    res.redirect(`${process?.env?.WEBSITE_URL}/login-success?token=${token}`);
  }
);

// 獲取試算表資料
app.get("/GetSheetDatas", GetSheetDatas);

// 提交遊玩分數至表單
app.post("/CommitScore", CommitScore);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
