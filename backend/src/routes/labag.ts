import { Router } from "express";
import { PDatas } from "labag";


export const router = Router();

router.get("/", (_, res)=>{
    res.status(200).json(PDatas)
})
