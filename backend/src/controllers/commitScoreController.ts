import { Request, Response } from "express";

export const commitScore = async (req: Request, res: Response) => {
  try {
    const { UserID, Name, Score, JsonData } = req.body;
    if (
      !UserID ||
      !Name ||
      !Score ||
      typeof Score !== "number" ||
      typeof JsonData !== "object"
    ) {
      res.status(400).json({ message: "請求數據缺失或是格是錯誤" });
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
      res.status(200).json({ message: "成功提交分數" });
      return;
    } else {
      res.status(response.status).json({
        message: `提交失敗，回應狀態: ${response.status}`,
      });
      return;
    }
  } catch (error: unknown) {
    res.status(500).json({ message: `伺服器錯誤，無法提交分數: ${error}` });
    return;
  }
};
