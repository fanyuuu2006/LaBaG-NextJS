import { Request, Response } from "express";
import { Sheet } from "../../config/googleapi";
import { authUser } from "../../types/user";
import { createUser, parseUser } from "../../utils/user";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const userResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "用戶資料!A:E",
    });
    const userRows = userResponse.data.values?.slice(1) as string[][];
    if (!userRows) {
      console.log("獲取試算表錯誤");
      res.status(400).json({ message: "獲取試算表錯誤" });
      return;
    }

    const userDatas: authUser[] = userRows.map((row) =>
      parseUser(row, ["email"])
    );

    res.status(200).json(userDatas);
    return;
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤，無法獲取資料: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const user = req.body as authUser;

    // 確保 createUser 執行成功
    const newUser = await createUser(user);
    if (!newUser) {
      res.status(500).json({ message: "❌ 無法添加用戶" });
      return;
    }

    res.status(201).json({ message: "✅ 添加用戶成功", user: newUser });
    return;
  } catch (error) {
    console.error("❌ 伺服器錯誤:", error);
    res.status(500).json({
      message: `❌ 伺服器錯誤，無法添加用戶: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as authUser["id"];
    if (!userId) {
      console.log("請求數據缺失或是格式錯誤");
      res.status(400).json({ message: "請求數據缺失或是格式錯誤" });
      return;
    }

    const response = await fetch(`${process.env.BACKEND_URL}/data/users`);
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const userRows = (await response.json()) as authUser[];

    const user = userRows.find((user) => user.id === userId);

    if (!user) {
      console.log("查詢不到該用戶資料");
      res.status(404).json({ message: "查詢不到該用戶資料" });
      return;
    }

    res.status(200).json(user);
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
