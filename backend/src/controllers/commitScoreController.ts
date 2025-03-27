import { Request, Response } from "express";
import { authUser } from "../types/auth";

export const commitScore = async (req: Request, res: Response) => {
  try {
    const { id: UserID, name: Name } = req.user as authUser;
    const { Score, JsonData } = req.body;
    if (
      !UserID ||
      !Name ||
      !Score ||
      typeof Score !== "number" ||
      typeof JsonData !== "object"
    ) {
      console.log("請求數據缺失或是格式錯誤");
      res.status(400).json({ message: "請求數據缺失或是格式錯誤" });
      return;
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
      console.log("成功提交分數");
      res.status(200).json({ message: "成功提交分數" });
      return;
    } else {
      console.log(`提交失敗，回應狀態: ${response.status}`);
      res.status(response.status).json({
        message: `提交失敗，回應狀態: ${response.status}`,
      });
      return;
    }
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤，無法提交分數: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};
