import jwt from "jsonwebtoken";
import { authUser } from "../types/auth";

export const generateToken = (user: authUser) =>
  jwt.sign(user, process.env.JWT_KEY as string, { expiresIn: "12h" });
