import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "./config/passport"; // 初始化 Passport 設定

import { router as authRouter } from "./routes/auth";
import { router as dataRouter } from "./routes/data";
import { globalRateLimit } from "./middlewares/rateLimitMiddleware";

export const app = express();

// 設置中介軟體，解析 JSON 請求體
app.use(express.json());

app.use(globalRateLimit);

app.use(
  cors({
    origin: [process.env.WEBSITE_URL as string],
    methods: ["GET", "POST", "PATCH"],
    credentials: true, // 允許跨域請求攜帶 Cookie
    allowedHeaders: ["Content-Type", "Authorization"], // `Cookie` 不是標準的請求標頭
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
