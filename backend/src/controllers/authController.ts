import { Request, Response } from "express";

import { authUser, signOptions, signProfiles } from "../types/auth";
import { checkAndAddUser, extractUserData } from "../utils/user";

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

export const signCallBack = async (req: Request, res: Response) => {
  try {
    const signBy = req.params.signBy as signOptions;
    if (!req.user) {
      console.log(`${signBy.toUpperCase()} 登入失敗：未取得用戶資訊`);
      return res.redirect(`${process.env.WEBSITE_URL}/Login`);
    }
    const user = req.user as signProfiles;
    const token = await checkAndAddUser(extractUserData(user));

    console.log(`${signBy.toUpperCase()}登入成功`);
    // 將 Token 傳給前端
    res.redirect(`${process.env.WEBSITE_URL}/login-success?token=${token}`);
  } catch (error: unknown) {
    console.error(error);
    res.redirect(`${process.env.WEBSITE_URL}/Login`);
  }
};
