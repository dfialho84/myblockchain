import Block from "../entities/block";
import { fromBlock } from "./block-mapper";

describe("BlockMapper", () => {
    describe("fromBlock", () => {
        it("should map block to block response", () => {
            const block = Block.mineBlock({
                lastBlock: Block.genesis(),
                data: "data",
            });

            const blockResponse = fromBlock(block);

            expect(blockResponse.timestamp).toBe(block.timestamp);
            expect(blockResponse.lastHash).toBe(block.lastHash);
            expect(blockResponse.data).toBe(block.data);
            expect(blockResponse.hash).toBe(block.hash);
        });
    });
});
