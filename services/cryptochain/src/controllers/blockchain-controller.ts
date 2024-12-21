import { Request, Response } from "express";
import Blockchain from "../domain/blockchain";

const blockchain = new Blockchain();

export const getAllBlocks = (req: Request, res: Response) => {
    res.json({ blocks: blockchain.chain });
};
