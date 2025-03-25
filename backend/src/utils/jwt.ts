import jwt from "jsonwebtoken";
import { User } from "../types/user";

export const generateToken = (user: User) => {
  return jwt.sign(user, process.env.JWT_KEY as string, { expiresIn: "1h" });
};
