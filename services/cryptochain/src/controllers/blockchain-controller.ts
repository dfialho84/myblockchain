import { Request, Response } from "express";
import BlockchainService from "../services/blockchain-service";
import { OutOfBoundsError } from "../exceptions";

export default class BlockchainController {
    private blockcahinService: BlockchainService;

    constructor(blockchainService: BlockchainService) {
        this.blockcahinService = blockchainService;
    }

    getAllBlocks(req: Request, res: Response) {
        try {
            res.status(200).json(
                this.blockcahinService.getAllBlocks(
                    req.locals?.pagination?.offset || 0,
                    req.locals?.pagination?.limit || 10
                )
            );
        } catch (err: unknown) {
            if (err instanceof OutOfBoundsError) {
                res.status(404).json({
                    code: 404,
                    messages: [err.message],
                });
            } else {
                res.status(500).json({
                    code: 500,
                    messages: [(err as Error).message],
                });
            }
        }
    }
}
