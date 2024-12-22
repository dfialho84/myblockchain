import { Request, Response } from "express";
import Blockchain from "../domain/blockchain";
import blockMapper from "../mappers/block-mapper";

const blockchain = new Blockchain();
blockchain.addBlock("a new block");

export const getAllBlocks = (req: Request, res: Response) => {
    res.json({
        blocks: blockchain.chain.map(blockMapper.fromBlock),
    });
};
