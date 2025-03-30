import { Router } from "express";
import { getFIleContent } from "../controllers/githubController";
export const router = Router();

router.get("/", getFIleContent);
