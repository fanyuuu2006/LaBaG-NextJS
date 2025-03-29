import { Router } from "express";
import { router as userRouter } from "./data/users";
import { router as recordRouter } from "./data/records";

export const router = Router();

router.use("/users", userRouter);
router.use("/records", recordRouter);
