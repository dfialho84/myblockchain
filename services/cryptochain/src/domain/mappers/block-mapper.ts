import Block from "../entities/block";
import { BlockResponse } from "../value-objects/blockchain-dtos";

export function fromBlock(block: Block): BlockResponse {
    return {
        timestamp: block.timestamp,
        lastHash: block.lastHash,
        data: block.data,
        hash: block.hash,
    };
}

export default { fromBlock };
