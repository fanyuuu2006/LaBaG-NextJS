import { Request, Response } from "express";
import { Profile } from "passport-google-oauth20";
import { generateToken } from "../utils/jwt";

export const googleCallback = (req: Request, res: Response) => {
  const user = req.user as Profile;

  // 產生 JWT Token
  const token = generateToken({
    id: user.id,
    name: user.displayName,
    email: user.emails?.[0].value ?? "",
    image: user.photos?.[0].value ??""
  });

  // 將 Token 傳給前端
  res.redirect(`${process.env.WEBSITE_URL}/login-success?token=${token}`);
};
