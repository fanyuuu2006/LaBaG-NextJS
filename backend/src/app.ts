import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import passport from "passport";
import "./config/passport"; // 初始化 Passport 設定

import { router as authRouter } from "./routes/auth";
import { router as commitScoreRouter } from "./routes/commitScore";
import { router as sheetRouter } from "./routes/sheet";

export const app = express();

// 設置中介軟體，解析 JSON 請求體
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 分鐘
    max: 20, // 最多請求 20次
    message: { message: "請求過於頻繁，請稍後再試" },
  })
);

app.use(
  cors({
    origin: [process.env.WEBSITE_URL as string], // 確保這裡是你的前端網址
    methods: ["GET", "POST"],
    credentials: true, // 允許 Cookie
    allowedHeaders: ["Content-Type", "cookie", "referer"], // 允許 Referer 和 Cookies
    exposedHeaders: ["referer", "Set-Cookie"], // 允許在前端讀取 Referer 和 Cookie
  })
);


app.use(passport.initialize());

app.get("/test", (_, res) => {
  res.send("The server is up and running!");
});

// 用戶登入
app.use("/auth", authRouter);

// 獲取試算表資料
app.use("/sheet", sheetRouter);

// 提交遊玩分數至表單
app.use("/commitScore", commitScoreRouter);
