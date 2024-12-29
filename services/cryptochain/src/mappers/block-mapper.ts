import Block from "../domain/block";
import { BlockResponse } from "../dtos/blockchain-dtos";

export function fromBlock(block: Block): BlockResponse {
    return {
        timestamp: block.timestamp,
        lastHash: block.lastHash,
        data: block.data,
        hash: block.hash,
    };
}

export default { fromBlock };
