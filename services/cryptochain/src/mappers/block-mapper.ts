import Block from "../domain/block";

export type BlockResponse = {
    timestamp: number;
    lastHash: string;
    data: any;
    hash: string;
};

export function fromBlock(block: Block): BlockResponse {
    return {
        timestamp: block.timestamp,
        lastHash: block.lastHash,
        data: block.data,
        hash: block.hash,
    };
}

export default { fromBlock };
