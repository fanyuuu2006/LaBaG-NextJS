import jwt from "jsonwebtoken";
import { authUser } from "../types/user";

export const generateToken = (user: authUser) =>
  jwt.sign(user, process.env.JWT_KEY as string, { expiresIn: "1h" });
