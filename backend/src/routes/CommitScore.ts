import { Request, Response } from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const CommitScore = async (req: Request, res: Response) => {
  try {
    const { UserID, Name, Score, JsonData } = req.body;
    if (
      !UserID ||
      !Name ||
      !Score ||
      typeof Score !== "number" ||
      typeof JsonData !== "object"
    ) {
      return res.status(400).json({ message: "請求數據缺失或是格是錯誤" });
    }

    const formData = new URLSearchParams();
    formData.append("entry.1181479366", UserID);
    formData.append("entry.868955826", Name);
    formData.append("entry.413238880", String(Score));
    formData.append("entry.255424064", JSON.stringify(JsonData));

    const response = await fetch(process.env.GOOGLE_FORM_RECORD ?? "", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (response.status === 204 || response.ok) {
      return res.status(200).json({ message: "成功提交分數" });
    } else {
      return res.status(response.status).json({
        message: `提交失敗，回應狀態: ${response.status}`,
      });
    }
  } catch (error: unknown) {
    return res
      .status(500)
      .json({ message: `伺服器錯誤，無法提交分數: ${error}` });
  }
};
