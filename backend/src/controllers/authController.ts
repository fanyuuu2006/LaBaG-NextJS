import { Request, Response } from "express";

import { authUser, signOptions, signProfiles } from "../types/user";
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

export const signInCallBack = async (req: Request, res: Response) => {
  try {
    const signBy = req.params.signBy as signOptions;
    if (!req.user) {
      console.log(`${signBy.toUpperCase()} 登入失敗：未取得用戶資訊`);
      return res.redirect(`${process.env.WEBSITE_URL}/Login`);
    }
    const user = extractUserData(req.user as signProfiles);

    // 先查找使用者，若不存在則創建
    let { user: existingUser } = await findUser(user.id);
    if (!existingUser) {
      existingUser = await createUser(user);
      if (!existingUser) throw new Error("❌ 無法創建使用者");
    }

    (req.session as unknown as { user: { token: string } }).user = { token: generateToken(existingUser, "12h") }; // Ensure user property is defined in SessionData

    console.log(`${signBy.toUpperCase()} 登入成功`);

    res.redirect(`${process.env.WEBSITE_URL}/Profile`);
  } catch (error: unknown) {
    console.error(error);
    res.redirect(`${process.env.WEBSITE_URL}/Login`);
  }
};

export const signOut = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      // 如果銷毀 session 出現錯誤，回傳 500 錯誤
      return res.status(500).json({ message: "登出失敗" });
    } 
    // 清除前端儲存的 cookie，Express session 預設的 cookie 名稱
    res.clearCookie("connect.sid", {
      httpOnly: true, // 確保只有伺服器端能讀取 cookie
      secure: process.env.NODE_ENV === "production", // 只有在生產環境下才設置 secure
      sameSite: "none", // 如果是跨域情境，設置 sameSite 為 none
    });

    // 回傳登出成功訊息
    res.status(200).json({ message: "登出成功" });
  });
};
