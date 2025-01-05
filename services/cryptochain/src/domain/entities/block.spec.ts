import Block, { HashFn } from "./block";
import { MineProps } from "./block";

describe("Block", () => {
    describe("genesis()", () => {
        it("should return the genesis block", () => {
            const genesisBlock = Block.genesis();
            expect(genesisBlock.timestamp).toBe(1);
            expect(genesisBlock.lastHash).toBe("---");
            expect(genesisBlock.data).toBe("");
        });
    });

    describe("mineBlock()", () => {
        const genesisBlock = Block.genesis();

        const mineProps: MineProps = {
            lastBlock: genesisBlock,
            data: "xxxx",
        };

        it("should set the timestamp to current time", () => {
            const currentTime = Date.now();
            const block = Block.mineBlock(mineProps);
            const afterTime = Date.now();

            expect(block.timestamp).toBeGreaterThanOrEqual(currentTime);
            expect(block.timestamp).toBeLessThanOrEqual(afterTime);
        });

        it("should have a lastHash propery", () => {
            const block = Block.mineBlock(mineProps);
            expect(block.lastHash).toBe(genesisBlock.hash);
        });

        it("should have a data propery", () => {
            const block = Block.mineBlock(mineProps);
            expect(block.data).toBe(mineProps.data);
        });

        it("should have a hash propery set", () => {
            const hasherMock: HashFn = jest.fn().mockReturnValue("mock-hash");
            Block.hasher = hasherMock;
            const block = Block.mineBlock(mineProps);
            expect(block.hash).toBe("mock-hash");
        });
    });
});
