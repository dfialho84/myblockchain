import { Router, Request, Response } from "express";
// import config from "../config";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    throw new Error("Method not implemented.");
});

export default router;
