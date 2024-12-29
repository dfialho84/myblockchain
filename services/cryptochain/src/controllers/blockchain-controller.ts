import { Request, Response } from "express";
import blockchainService from "../services/blockchain-service";

export const getAllBlocks = (req: Request, res: Response) => {
    res.status(200).json({ blocks: blockchainService.getAllBlocks() });
};
