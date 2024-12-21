import Blockchain from "./blockchain";
import Block from "./block";
import exp from "constants";

describe("Blockchain", () => {
    it("should be created with a chain with only the genesis block", () => {
        const blockchain = new Blockchain();
        expect(blockchain.chain).toEqual([Block.genesis()]);
    });

    describe("addBlock", () => {
        it("should add a new block to the chain", () => {
            const blockchain = new Blockchain();
            const data = "foo";

            blockchain.addBlock(data);

            expect(blockchain.chain.length).toBe(2);
        });

        it("should mine the new block properly after added", () => {
            Block.hasher = jest.fn().mockReturnValue("mock-hash");
            const blockchain = new Blockchain();
            const data = "foo";

            const before = Date.now();
            blockchain.addBlock(data);
            const after = Date.now();

            const addedBlock = blockchain.chain[blockchain.chain.length - 1];

            expect(addedBlock.data).toBe(data);
            expect(addedBlock.lastHash).toBe(Block.genesis().hash);
            expect(addedBlock.timestamp).toBeGreaterThanOrEqual(before);
            expect(addedBlock.timestamp).toBeLessThanOrEqual(after);
            expect(addedBlock.hash).toBe("mock-hash");
        });

        it("should set the last hash properly", () => {
            const blockchain = new Blockchain();
            const data = "foo";

            blockchain.addBlock("previousBlockData");
            blockchain.addBlock(data);

            const addedBlock = blockchain.chain[blockchain.chain.length - 1];
            const prevBlock = blockchain.chain[blockchain.chain.length - 2];

            expect(addedBlock.lastHash).toBe(prevBlock.hash);
        });
    });
});
