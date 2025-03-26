import { Request, Response } from "express";
import { Profile } from "passport-google-oauth20";
import { authUser } from "../types/user";
import { checkAndAddUser, extractUserData } from "../utils/user";

// Google 登入回調
export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as Profile;
    const token = await checkAndAddUser(extractUserData(user));

    console.log("登入成功")
    // 將 Token 傳給前端
    res.redirect(`${process.env.WEBSITE_URL}/login-success?token=${token}`);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤出現錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    res.redirect(`${process.env.WEBSITE_URL}/Login`);
  }
};

// 獲取用戶資料
export const getUserProfile = (req: Request, res: Response) => {
  const user = req.user as authUser;

  if (!user) {
    console.log("未登入或無效的身份驗證");
    res.status(401).json({ message: "未登入或無效的身份驗證" });
    return;
  }

  res.status(200).json(user);
};
