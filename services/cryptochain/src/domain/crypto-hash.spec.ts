import cryptoHash from "./crypto-hash";

describe("CryptoHash", () => {
    it("should return the same hash with the same input arguments in any order", () => {
        const hash1 = cryptoHash("one", "two", "three");
        const hash2 = cryptoHash("three", "one", "two");
        expect(hash1).toBe(hash2);
    });

    it("shold throw exception if arguments are empty", () => {
        expect(() => cryptoHash()).toThrow();
    });

    it("should return the sha-256 hash", () => {
        const hash = cryptoHash("foo");
        expect(hash).toBe(
            "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
        );
    });
});
