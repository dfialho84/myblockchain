import { Router, Request, Response, NextFunction } from "express";
import paginationMiddleware from "../middleware/pagination-middleware";
// import BlockchainController from "../controllers/blockchain-controller";

const router = Router();

router.get("/", paginationMiddleware, (req: Request, res: Response) => {
    throw new Error("Method not implemented.");
});

export default router;
