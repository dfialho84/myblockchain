import { BlockResponse } from "../dtos/blockchain-dtos";

class BlockchainServie {
    public constructor() {}

    // public static getInstance(): BlockchainServie {
    //     throw new Error("Not implemented");
    // }

    public getAllBlocks(): Array<BlockResponse> {
        throw new Error("Not implemented");
    }
}

export default new BlockchainServie();
