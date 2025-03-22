import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { CommitScore } from "./routes/CommitScore"; // 請確保導入正確的路徑
import cors from "cors";

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
    origin: [process.env.WEBSITE_URL as string], // 只允許指定的網站
    methods: ["GET", "POST"], // 允許的 HTTP 方法
    allowedHeaders: ["Content-Type"], // 允許的請求標頭
  })
);

// // API key 驗證中介軟體
// const verifyApiKey = (req: Request, res: Response, next: NextFunction): void => {
//   const apiKey = req.headers['x-api-key'];

//   // 如果 API Key 無效，返回 401 錯誤
//   if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
//     res.status(401).json({ message: "未經授權的請求或是無效的金鑰" });
//     return
//   }

//   // 驗證成功，調用 next() 繼續處理後續邏輯
//   next();
// };

// 設置中介軟體，解析 JSON 請求體
app.use(express.json());

app.get("/test", (_, res) => {
  res.send("The server is up and running!");
});

app.post("/CommitScore", async (req: Request, res: Response) => {
  try {
    // 調用 CommitScore 函數並傳遞 req 和 res
    await CommitScore(req, res);
  } catch (error) {
    // 如果 CommitScore 函數出現錯誤，可以這樣處理
    res.status(500).json({ message: "處理請求時出現錯誤" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
