import BlockchainValidator from "./blockchain-validator";
import { Block, GENESIS_BLOCK } from "../../../domain/entities/block";

describe("BlockchainValidator", () => {
    let validator: BlockchainValidator;

    beforeEach(() => {
        validator = new BlockchainValidator();
    });

    describe("validateChain", () => {
        it("should return false when the chain is empty", () => {
            const chain: Block[] = [];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when the genesis block is not present", () => {
            const block: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "dsfgdgfsdgsd",
                reward: {
                    address: "xxxxx",
                    amount: 0,
                },
                hash: "",
                difficulty: 3,
            };
            const chain: Block[] = [block];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when the hashes chain doesnt match", () => {
            const block1: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "dsfgdgfsdgsd",
                reward: {
                    address: "xxxxx",
                    amount: 100,
                },
                hash: "",
                difficulty: 3,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when the difficulty in the 2nd block is not equal the initial amount", () => {
            const block1: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "",
                reward: {
                    address: "xxxxx",
                    amount: 100,
                },
                hash: "",
                difficulty: 2,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when there is a jump (downward) in the difficulty", () => {
            const block1: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "",
                reward: {
                    address: "xxxxx",
                    amount: 100,
                },
                hash: "000xxxxxxx",
                difficulty: 3,
            };
            const block2: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "000xxxxxxx",
                reward: {
                    address: "xxxxx",
                    amount: 100,
                },
                hash: "0xxxxxx",
                difficulty: 1,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1, block2];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when there is a jump (upward) in the difficulty", () => {
            const block1: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "dsfgdgfsdgsd",
                reward: {
                    address: "xxxxx",
                    amount: 100,
                },
                hash: "000xxxxxxx",
                difficulty: 3,
            };
            const block2: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "dsfgdgfsdgsd",
                reward: {
                    address: "xxxxx",
                    amount: 100,
                },
                hash: "0xxxxxx",
                difficulty: 5,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1, block2];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when the hash is not according to the difficulty", () => {
            const block1: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "",
                reward: {
                    address: "xxxxx",
                    amount: 100,
                },
                hash: "00xxxxxxxx",
                difficulty: 3,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when the hash is not valid", () => {
            expect(false).toBeTruthy();
        });

        it("should return false when the number os zeroes diminished and the time between blocks is lower than the minimum", () => {
            expect(false).toBeTruthy();
        });

        it("should return false when the amount to the miner is incorrect", () => {
            expect(false).toBeTruthy();
        });

        it("should return false when there are any invalid transaction on the data", () => {
            expect(false).toBeTruthy();
        });

        it("should return true for a chain with only the genesis block", () => {
            expect(false).toBeTruthy();
        });

        it("should return true for a valid chain", () => {
            expect(false).toBeTruthy();
        });
    });
});
