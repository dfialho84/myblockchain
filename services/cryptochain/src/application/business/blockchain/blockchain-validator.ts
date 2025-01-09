import { Block, GENESIS_BLOCK } from "../../../domain/entities/block";

type hasher = (...inputs: string[]) => string;

function startsWithNZeroes(str: string, n: number): boolean {
    const zeroes = "0".repeat(n);
    return str.startsWith(zeroes);
}

export default class BlockchainValidator {
    public validateChain(chain: Block[]): boolean {
        if (chain.length === 0) {
            return false;
        }
        if (!this.hasGenesisBlock(chain)) {
            return false;
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

        throw new Error("Not implemented");
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
                block.reward.address !== GENESIS_BLOCK.reward.address ||
                block.reward.amount !== GENESIS_BLOCK.reward.amount ||
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
}
