import express, { Request, Response } from "express";
import { CommitScore } from "./routes/CommitScore"; // 請確保導入正確的路徑

const app = express();

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

export default app;
