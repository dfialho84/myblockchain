import { Router, Request, Response } from "express";
import BlockchainController from "../controllers/blockchain-controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    throw new Error("Method not implemented.");
});

export default router;
