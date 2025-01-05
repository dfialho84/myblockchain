import WalletService from "./wallet-service";

let genKeyPairMock = jest.fn();
jest.mock("../../domain/entities/crypto-hash", () => ({
    genKeyPair: () => genKeyPairMock(),
}));

describe("WalletService", () => {
    describe("createWallet", () => {
        it("should create a new valid wallet", () => {
            genKeyPairMock.mockReturnValue({
                publicKey: "address",
                privateKey: "privateKey",
            });

            const walletService = new WalletService();

            const wallet = walletService.createWallet();

            expect(wallet.address).toEqual("address");
            expect(wallet.privateKey).toEqual("privateKey");
        });
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
});
