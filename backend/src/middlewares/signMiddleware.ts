import { Request, Response, NextFunction } from "express";
import { signOptions } from "../types/auth";
import passport from "../config/passport";

export const signInMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signBy = req.params.signBy as signOptions;
    let scope: string[] = [];
    if (signBy === "google") scope = ["profile", "email"];
    else if (signBy === "github") scope = ["user", "user:email"];

    passport.authenticate(signBy, { scope })(req, res, next);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const signCallBackMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signBy = req.params.signBy as signOptions;
    passport.authenticate(signBy, { session: false })(req, res, next);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};
