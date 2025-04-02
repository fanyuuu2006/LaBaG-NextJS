import { Request, Response } from "express";

import { authUser, signOptions, signProfiles } from "../types/auth";
import { createUser, extractUserData, findUser } from "../utils/user";
import { generateToken } from "../utils/jwt";

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
    const user = extractUserData(req.user as signProfiles);

    // 先查找使用者，若不存在則創建
    let existingUser = await findUser(user);
    if (!existingUser) {
      existingUser = await createUser(user);
      if (!existingUser) throw new Error("❌ 無法創建使用者");
    }

    const token = generateToken(
      existingUser,
      process.env.JWT_KEY as string,
      "12h"
    );

    console.log(`${signBy.toUpperCase()}登入成功`);
    // 將 Token 傳給前端
    res.redirect(`${process.env.WEBSITE_URL}/login-success?token=${token}`);
  } catch (error: unknown) {
    console.error(error);
    res.redirect(`${process.env.WEBSITE_URL}/Login`);
  }
};
