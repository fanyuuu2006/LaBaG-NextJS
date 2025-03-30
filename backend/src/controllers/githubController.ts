import { Request, Response } from "express";

export const getFIleContent = async (req: Request, res: Response) => {
  try {
    const file = req.params.file;

    // 檢查參數
    if (!file) {
      res.status(400).json({ error: "未提供有效的文件名稱" });
      return;
    }

    const response = await fetch(
      `https://api.github.com/repos/fanyuuu2006/LaBaG-NextJS/contents/${file}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
          Accept: "application/vnd.github.v3.raw", // 返回原始內容
        },
      }
    );

    if (!response.ok) {
      // 處理 GitHub API 返回的錯誤
      const errorData = await response.json();
      const errorMessage = errorData.message || "無法擷取 GitHub";
      res.status(response.status).json({ error: errorMessage });
      return;
    }

    const readmeContent = await response.text();
    res.status(200).json({ content: readmeContent });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};
