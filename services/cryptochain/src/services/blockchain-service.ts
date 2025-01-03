import { BlockResponse } from "../dtos/blockchain-dtos";

export default class BlockchainServie {
    public constructor() {}

    public getAllBlocks(offset: number, limit: number): Array<BlockResponse> {
        throw new Error("Not implemented");
    }
}
