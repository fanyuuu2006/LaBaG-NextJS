import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authUser } from "../types/auth";

// 驗證 JWT Token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token; // 取得 Cookie 內的 Token
  if (!token) {
    console.log("未授權的存取");
    console.log(req.cookies);
    res.status(401).json({ message: "未授權的存取" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string); // 驗證 Token
    req.user = decoded as authUser; // 存到 req.user，供後續 API 使用
    console.log(`${decoded}成功存取`)
    next();
  } catch (error) {
    console.log("無效的 Token");
    res.status(403).json({ message: "無效的 Token" });
    return;
  }
};
