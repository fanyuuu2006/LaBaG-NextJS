import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { CommitScore } from "./routes/CommitScore"; // 請確保導入正確的路徑
import cors from "cors";
import { GetSheetDatas } from "./routes/GetSheetData";

const app = express();

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 分钟
    max: 10, // 每分钟最多允许 10 次请求
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

// 設置中介軟體，解析 JSON 請求體
app.use(express.json());

app.get("/test", (_, res) => {
  res.send("The server is up and running!");
});

app.get("/GetSheetDatas", async (req: Request, res: Response) => {
  try {
    await GetSheetDatas(req, res);
  } catch (error) {
    res.status(500).json({ message: `處理請求時出現錯誤: ${error}` });
  }
});

app.post("/CommitScore", async (req: Request, res: Response) => {
  try {
    await CommitScore(req, res);
  } catch (error) {
    res.status(500).json({ message: `處理請求時出現錯誤: ${error}` });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
