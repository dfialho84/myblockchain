import cryptoHash from "./crypto-hash";

export type BlockData = {
    toString: () => string;
};

type BlockProps = {
    timestamp: number;
    lastHash: string;
    data: BlockData;
};

export type MineProps = {
    lastBlock: Block;
    data: BlockData;
};

export type HashFn = (...inputs: string[]) => string;

export default class Block {
    private _timestamp: number;
    private _lastHash: string;
    private _data: any;
    private _hash: string;

    private static _hasher: HashFn = cryptoHash;

    public static set hasher(hasher: HashFn) {
        this._hasher = hasher;
    }

    public static genesis(): Block {
        return new Block({ timestamp: 1, lastHash: "---", data: "" });
    }

    public static mineBlock({ lastBlock, data }: MineProps): Block {
        return new Block({
            timestamp: Date.now(),
            lastHash: lastBlock.hash,
            data,
        });
    }

    private constructor({ timestamp, lastHash, data }: BlockProps) {
        this._timestamp = timestamp;
        this._lastHash = lastHash;
        this._data = data;
        this._hash = Block._hasher(
            timestamp.toString(),
            lastHash,
            data.toString()
        );
    }

    public get hash(): string {
        return this._hash;
    }

    public get timestamp(): number {
        return this._timestamp;
    }

    public get lastHash(): string {
        return this._lastHash;
    }

    public get data(): any {
        return this._data;
    }
}
