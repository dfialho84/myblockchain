import { Transaction, TransactionEntry } from "./transaction";

export type BlockData = {
    // transactions: Transaction[];
    // reward: TransactionEntry;
    toString: () => string;
};

export type Block = {
    readonly nonce: number;
    readonly timestamp: number;
    readonly lastHash: string;
    readonly data: BlockData;
    readonly difficulty: number;
    readonly hash: string;
};

export const GENESIS_BLOCK: Block = {
    nonce: 0,
    timestamp: 0,
    lastHash: "",
    data: "",
    hash: "",
    // reward: {
    //     address: "diego",
    //     amount: 9007199254740991,
    // },
    difficulty: 3,
};
