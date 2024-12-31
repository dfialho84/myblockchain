// import { createSign, createVerify } from "crypto";
import {
    cryptoHash,
    KeyPair,
    genKeyPair,
    verifySignature,
    signText,
} from "./crypto-hash";

describe("CryptoHash", () => {
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

    describe("GenKeyPair", () => {
        it("should generate a valid key pair", () => {
            const { privateKey, publicKey }: KeyPair = genKeyPair();

            const message = "Teste de Chaves";

            const signature = signText(privateKey, message);

            expect(verifySignature(publicKey, message, signature)).toBeTruthy();
        });
    });

    describe("signText", () => {
        it("should sign a text correctly", () => {
            const { privateKey, publicKey }: KeyPair = genKeyPair();

            const message = "Teste de Chaves";

            const signature = signText(privateKey, message);

            expect(verifySignature(publicKey, message, signature)).toBeTruthy();
        });

        it("should generate two different signatures when the messages are different", () => {
            const { privateKey, publicKey }: KeyPair = genKeyPair();

            const message1 = "Teste de Chaves";
            const message2 = "Teste de Chaves2";

            const signature1 = signText(privateKey, message1);
            const signature2 = signText(privateKey, message2);

            expect(signature1).not.toEqual(signature2);
        });

        it("should generate two different signatures over the same message when the keys are different", () => {
            const { privateKey: privateKey1 }: Partial<KeyPair> = genKeyPair();
            const { privateKey: privateKey2 }: Partial<KeyPair> = genKeyPair();

            const message = "Teste de Chaves";

            const signature1 = signText(privateKey1, message);
            const signature2 = signText(privateKey2, message);

            expect(signature1).not.toEqual(signature2);
        });
    });

    describe("verifySignature", () => {
        it("should verify a correctly signed message", () => {
            const { privateKey, publicKey }: KeyPair = genKeyPair();

            const message = "Teste de Chaves";

            const signature = signText(privateKey, message);

            expect(verifySignature(publicKey, message, signature)).toBeTruthy();
        });

        it("should verify a correctly a altered message", () => {
            const { privateKey, publicKey }: KeyPair = genKeyPair();

            const message = "Teste de Chaves";

            const signature = signText(privateKey, message);

            expect(
                verifySignature(publicKey, message + "x", signature)
            ).toBeFalsy();
        });

        it("should verify a correctly a altered signature", () => {
            const { privateKey, publicKey }: KeyPair = genKeyPair();

            const message = "Teste de Chaves";

            const signature = signText(privateKey, message);

            expect(verifySignature(publicKey, message, "xxxx")).toBeFalsy();
        });

        it("should verify a correctly a different public key", () => {
            const { privateKey: privateKey1 }: Partial<KeyPair> = genKeyPair();
            const { publicKey: publickey2 }: Partial<KeyPair> = genKeyPair();

            const message = "Teste de Chaves";

            const signature = signText(privateKey1, message);

            expect(verifySignature(publickey2, message, "xxxx")).toBeFalsy();
        });
    });
});
