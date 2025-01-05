import { BlockResponse } from "../../domain/value-objects/blockchain-dtos";

export default class BlockchainService {
    public constructor() {}

    public getAllBlocks(offset: number, limit: number): Array<BlockResponse> {
        throw new Error("Not implemented");
    }
}
