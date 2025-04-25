import express from "express";
import session from "express-session"
import cors from "cors";
import morgan from "morgan";
import passport from "./config/passport"; // 初始化 Passport 設定

import { router as authRouter } from "./routes/auth";
import { router as dataRouter } from "./routes/data";
import { router as labagRouter } from "./routes/labag";
import { globalRateLimit } from "./middlewares/rateLimitMiddleware";

export const app = express();

// 設置中介軟體，解析 JSON 請求體
app.use(express.json());

app.use(globalRateLimit);

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_KEY as string, // 請使用環境變數儲存
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 只在 HTTPS 下傳送
    maxAge: 1000 * 60 * 60 * 12, // 12 小時
    sameSite: "none", // 跨網域時必須為 'none'
  }, // 一天
}));

app.use(
  cors({
    origin: process.env.WEBSITE_URL as string,
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

// 遊戲數據
app.use("/labag", labagRouter);
