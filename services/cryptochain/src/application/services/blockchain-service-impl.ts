import { BlockResponse } from "../../domain/value-objects/blockchain-dtos";
import { BlockchainService } from "../ports/in/services";

export default class BlockchainServiceImpl implements BlockchainService {
    public constructor() {}

    public getAllBlocks(offset: number, limit: number): Array<BlockResponse> {
        throw new Error("Not implemented");
    }
}
