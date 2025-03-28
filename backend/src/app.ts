import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import passport from "./config/passport"; // 初始化 Passport 設定

import { router as authRouter } from "./routes/auth";
import { router as dataRouter } from "./routes/data";

export const app = express();

// 設置中介軟體，解析 JSON 請求體
app.use(express.json());

// 讓 Express 信任 X-Forwarded-For 頭
app.set("trust proxy", true);

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 分鐘
    max: 50, // 最多請求 50次
    message: { message: "請求過於頻繁，請稍後再試" },
    keyGenerator: (req) => req?.ip ?? "", // 使用來自每個請求的 req.ip（即客戶端的 IP 地址）來生成唯一的識別鍵 這樣系統就會對每個 IP 地址進行獨立的限流控制
  })
);

app.use(
  cors({
    origin: [process.env.WEBSITE_URL as string | "http://localhost:3000"], // 確保這裡是你的前端網址
    methods: ["GET", "POST"],
    credentials: true, // 允許 Cookie
    allowedHeaders: ["Content-Type", "Cookie", "Referer", "Authorization"], // 允許 Referer 和 Cookies
  })
);

// 打印請求日誌
app.use(morgan("dev"));

app.use(passport.initialize());

app.get("/test", (_, res) => {
  res.send("The server is up and running!");
});

// 用戶登入
app.use("/auth", authRouter);

// 資料庫
app.use("/data", dataRouter);

