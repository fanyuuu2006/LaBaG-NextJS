import { Request, Response } from "express";
import { authUser } from "../../types/user";
import { createUser, findUser } from "../../utils/user";
import { getUsers as getUsersUtil } from "../../utils/user";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await getUsersUtil();
    res.status(200).json(users);
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

    const { user } = await findUser(userId);

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
