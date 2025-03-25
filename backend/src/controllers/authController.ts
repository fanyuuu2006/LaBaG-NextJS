import { Request, Response } from "express";
import { Profile } from "passport-google-oauth20";
import { generateToken } from "../utils/jwt";
import { User } from "../types/user";

export const googleCallback = (req: Request, res: Response) => {
  const user = req.user as Profile;

  // 產生 JWT Token
  const token = generateToken({
    id: user.id,
    name: user.displayName,
    email: user.emails?.[0].value ?? "",
    image: user.photos?.[0].value ?? "",
  });

  // 將 Token 傳給前端
  res.redirect(`${process.env.WEBSITE_URL}/login-success?token=${token}`);
};
// 獲取用戶資料
export const getUserProfile = (req: Request, res: Response) => {
  const user = req.user as User;

  if (!user) {
    res.status(401).json({ message: "未登入或無效的身份驗證" });
    return;
  }

  // 返回用戶資料
  res.status(200).json(user);
};
