import { Request, Response } from "express";
// import blockchainService from "../services/blockchain-service";

// export const getAllBlocks = (req: Request, res: Response) => {
//     res.status(200).json({ blocks: blockchainService.getAllBlocks() });
// };

export default class BlockchainController {
    getAllBlocks(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}
