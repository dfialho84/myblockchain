import { Block, GENESIS_BLOCK } from "../../../domain/entities/block";

export type HasherFn = (...inputs: string[]) => string;
export type BlockDataValidator = {
    validate: (chain: Block[]) => boolean;
};

function startsWithNZeroes(str: string, n: number): boolean {
    const zeroes = "0".repeat(n);
    return str.startsWith(zeroes);
}

const TIME_BTW_BLOCKS_MS = 300000;

export default class BlockchainValidator {
    constructor(
        private hasher: HasherFn,
        private dataValidator: BlockDataValidator
    ) {}

    public validateChain(chain: Block[]): boolean {
        if (chain.length === 0) {
            return false;
        }
        if (!this.hasGenesisBlock(chain)) {
            return false;
        }

        if (chain.length === 1) {
            return true;
        }

        if (!this.validateInitialZeroes(chain)) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const previousBlock = chain[i - 1];
            if (!this.validateBlock(block, previousBlock)) {
                return false;
            }
        }

        if (!this.dataValidator.validate(chain)) {
            return false;
        }

        return true;
    }

    private hasGenesisBlock(chain: Block[]): boolean {
        if (chain.length > 0) {
            const block = chain[0];
            let keys1 = Object.keys(block);
            let keys2 = Object.keys(GENESIS_BLOCK);

            if (keys1.length !== keys2.length) {
                return false;
            }

            if (
                block.data !== GENESIS_BLOCK.data ||
                block.timestamp !== GENESIS_BLOCK.timestamp ||
                block.lastHash !== GENESIS_BLOCK.lastHash ||
                block.hash !== GENESIS_BLOCK.hash ||
                block.difficulty !== GENESIS_BLOCK.difficulty ||
                block.nonce !== GENESIS_BLOCK.nonce
            ) {
                return false;
            }
            return true;
        }
        return false;
    }

    private validateInitialZeroes(chain: Block[]): boolean {
        return chain.length > 1 && chain[1].difficulty === 3;
    }

    private validateBlock(block: Block, previous: Block): boolean {
        if (!this.validateLasthash(block, previous)) {
            return false;
        }
        if (!this.validateJump(block, previous)) {
            return false;
        }

        if (!this.validateDifficulty(block)) {
            return false;
        }

        if (!this.validateHash(block)) {
            return false;
        }

        if (!this.validateTimeJumps(block, previous)) {
            return false;
        }
        return true;
    }

    private validateLasthash(block: Block, previous: Block): boolean {
        return block.lastHash === previous.hash;
    }

    private validateJump(block: Block, previous: Block): boolean {
        return Math.abs(block.difficulty - previous.difficulty) <= 1;
    }

    private validateDifficulty(block: Block): boolean {
        return startsWithNZeroes(block.hash, block.difficulty);
    }

    private validateHash(block: Block): boolean {
        const hash: string = this.hasher(
            JSON.stringify(block.data),
            block.difficulty.toString(),
            block.lastHash,
            block.nonce.toString(),
            block.timestamp.toString()
        );
        return block.hash === hash;
    }

    private validateTimeJumps(block: Block, previous: Block): boolean {
        const allowDifficultyReduction =
            block.timestamp - previous.timestamp > TIME_BTW_BLOCKS_MS;
        const difficultyDiff = block.difficulty - previous.difficulty;
        if (difficultyDiff >= 0) {
            return true;
        }

        return allowDifficultyReduction;
    }
}
