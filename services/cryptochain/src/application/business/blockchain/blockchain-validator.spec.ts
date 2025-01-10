import BlockchainValidator from "./blockchain-validator";
import { HasherFn, BlockDataValidator } from "./blockchain-validator";
import { Block, GENESIS_BLOCK } from "../../../domain/entities/block";

describe("BlockchainValidator", () => {
    let validator: BlockchainValidator;
    let blockDataValidator: BlockDataValidator;
    let hasherMock: HasherFn;

    beforeEach(() => {
        hasherMock = jest.fn() as unknown as HasherFn;
        blockDataValidator = {} as BlockDataValidator;
        validator = new BlockchainValidator(hasherMock, blockDataValidator);
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
                hash: "000xxxxxxx",
                difficulty: 3,
            };
            const block2: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "000xxxxxxx",
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
                hash: "000xxxxxxx",
                difficulty: 3,
            };
            const block2: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "dsfgdgfsdgsd",
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
                hash: "00xxxxxxx",
                difficulty: 3,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when the hash is not valid", () => {
            (hasherMock as jest.Mock).mockReturnValue("invalid hash");

            const block1: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "",
                hash: "000xxxxxxx",
                difficulty: 3,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when the number os zeroes diminished and the time between blocks is lower than the minimum", () => {
            const hashes = ["000xxxxxxxx", "00xxxxxxxxxxxx"];
            (hasherMock as jest.Mock)
                .mockImplementationOnce(() => hashes[0])
                .mockImplementationOnce(() => hashes[1]);

            const block1: Block = {
                nonce: 0,
                timestamp: 1,
                data: "dsfdsffsd",
                lastHash: "",
                hash: hashes[0],
                difficulty: 3,
            };
            const block2: Block = {
                nonce: 0,
                timestamp: 5,
                data: "dsfdsffsd",
                lastHash: hashes[0],
                hash: hashes[1],
                difficulty: 2,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1, block2];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return false when there are any invalid transaction on the data", () => {
            (hasherMock as jest.Mock).mockReturnValueOnce("000xxxxxxxx");
            blockDataValidator.validate = jest.fn().mockReturnValue(false);
            const block1: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "",
                hash: "000xxxxxxxx",
                difficulty: 3,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1];

            expect(validator.validateChain(chain)).toEqual(false);
        });

        it("should return true for a chain with only the genesis block", () => {
            blockDataValidator.validate = jest.fn().mockReturnValue(true);
            const chain: Block[] = [GENESIS_BLOCK];

            expect(validator.validateChain(chain)).toEqual(true);
        });

        it("should return true for a valid chain", () => {
            (hasherMock as jest.Mock).mockReturnValueOnce("000xxxxxxxx");
            blockDataValidator.validate = jest.fn().mockReturnValue(true);
            const block1: Block = {
                nonce: 0,
                timestamp: 123243,
                data: "dsfdsffsd",
                lastHash: "",
                hash: "000xxxxxxxx",
                difficulty: 3,
            };
            const chain: Block[] = [GENESIS_BLOCK, block1];

            expect(validator.validateChain(chain)).toEqual(true);
        });
    });
});
