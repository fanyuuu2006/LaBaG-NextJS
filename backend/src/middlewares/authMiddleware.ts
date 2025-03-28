import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authUser } from "../types/auth";

// 驗證 JWT Token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    res.status(401).json({ message: "未授權的存取" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string); // 驗證 Token
    req.user = decoded as authUser; // 存到 req.user，供後續 API 使用
    next();
  } catch (error) {
    res.status(403).json({ message: "無效的 Token" });
    return;
  }
};
