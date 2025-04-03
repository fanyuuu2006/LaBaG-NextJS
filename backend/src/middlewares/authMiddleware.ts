import { Request, Response, NextFunction } from "express";
import { authUser } from "../types/user";
import { verifyToken } from "../utils/jwt";

// 驗證 JWT Token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "未授權的存取" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as authUser; // 存到 req.user，供後續 API 使用
    next();
  } catch (error) {
    res.status(403).json({ message: "無效的 Token" });
    return;
  }
};
