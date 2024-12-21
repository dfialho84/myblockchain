import Block, { BlockData } from "./block";

export default class Blockchain {
    private _chain: Block[];

    constructor() {
        this._chain = [Block.genesis()];
    }

    public get chain(): ReadonlyArray<Block> {
        return Object.freeze([...this._chain]);
    }

    public addBlock(data: BlockData) {
        const lastBlock = this._chain[this._chain.length - 1];
        const newBlock = Block.mineBlock({ lastBlock, data });

        this._chain.push(newBlock);
    }
}
