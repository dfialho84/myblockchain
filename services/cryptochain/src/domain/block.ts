export type BlockData = any;

type BlockProps = {
    timestamp: number;
    lastHash: string;
    data: BlockData;
};

export type MineProps = {
    lastBlock: Block;
    data: BlockData;
};

export default class Block {
    private _timestamp: number;
    private _lastHash: string;
    private _data: any;
    private _hash: string;

    public static genesis(): Block {
        return new Block({ timestamp: 1, lastHash: "---", data: null });
    }

    public static mineBlock({ lastBlock, data }: MineProps): Block {
        throw new Error("Method not implemented.");
    }

    private constructor({ timestamp, lastHash, data }: BlockProps) {
        this._timestamp = timestamp;
        this._lastHash = lastHash;
        this._data = data;
        this._hash = "x";
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
