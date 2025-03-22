import { Request, Response } from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const CommitScore = async (req: Request, res: Response) => {
  try {
    const referer = req.headers["referer"] as string | undefined;
    if (!referer || !referer.startsWith(process?.env?.WEBSITE_URL as string)) {
      return res.status(403).json({ message: `${referer ?? ""} 禁止存取` });
    }

    const cookies = req.headers["cookie"];
    const parsedCookies = cookies ? cookie.parse(cookies) : {};
    // 获取存储在 Cookie 中的 JWT
    const token =
      parsedCookies["next-auth.session-token"] ||
      parsedCookies["__Secure-next-auth.session-token"];

    if (!token) {
      return res.status(400).json({ message: "無效的token" });
    }
    // 解析 JWT
    const decodedToken = jwt.decode(token);
    if (
      !decodedToken ||
      typeof decodedToken !== "object" ||
      !decodedToken.sub
    ) {
      return res.status(400).json({ message: "token 中未包含有效的 UserID" });
    }

    // 確保 decodedToken 存在並且包含 sub 字段
    const userId = decodedToken?.sub;
    if (!userId) {
      return res.status(400).json({ message: "token 中未包含有效的 UserID" });
    }

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
