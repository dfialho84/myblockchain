import BlockchainService from "./blockchain-service-impl";

describe("Blockchain Service", () => {
    let blockchainService: BlockchainService;

    beforeEach(() => {
        blockchainService = new BlockchainService();
    });

    describe("getAllBlocks", () => {
        it("should return the blocks according to the page params", () => {
            expect(false).toBeTruthy();
        });

        it("should throw an OutOfBounds Error if it is outside the bounds", () => {
            expect(false).toBeTruthy();
        });

        it("should return the number of remaining blocks if the page is the last one", () => {
            expect(false).toBeTruthy();
        });
    });
});
