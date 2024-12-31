import { Router, Request, Response } from "express";
import config from "../config";

const router = Router();

router.post("/new", (req: Request, res: Response) => {
    config.walletController.newWallet(req, res);
});

export default router;
