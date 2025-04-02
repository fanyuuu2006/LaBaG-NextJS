import { Request, Response, NextFunction } from "express";
import { authUser } from "../types/auth";
import { verifyNonce } from "../utils/nonce";

export const nonceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nonce } = req.body;
  // 確保 req.user 存在
  if (!req.user || !nonce) {
    res.status(401).json({ message: "未授權的存取" });
    return;
  }

  const { id } = req.user as authUser;

  if (!verifyNonce(nonce, id)) {
    res.status(403).json({ message: "無效的 Token" });
    return;
  }

  next();
};
