import crypto from "crypto";

export function cryptoHash(...inputs: string[]): string {
    if (inputs.length === 0) {
        throw new Error("Empty input arguments");
    }
    const data = inputs.sort().join(" ");
    return crypto.createHash("sha256").update(data).digest("hex");
}

export type KeyPair = {
    privateKey: string;
    publicKey: string;
};

function convertoToBase64(text: string): string {
    return Buffer.from(text).toString("base64");
}

function convertFromBase64(base64: string): string {
    return Buffer.from(base64, "base64").toString("utf-8");
}

export function genKeyPair(): KeyPair {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    const publicKeyConverted = convertoToBase64(publicKey);
    const privateKeyConverted = convertoToBase64(privateKey);

    return {
        publicKey: publicKeyConverted,
        privateKey: privateKeyConverted,
    };
}

export function signText(privateKey: string, text: string): string {
    const privateKeyBuffer = convertFromBase64(privateKey);
    const sign = crypto.createSign("SHA256");
    sign.update(text);
    sign.end();
    const signature = sign.sign(privateKeyBuffer, "base64");
    return signature;
}

export function verifySignature(
    publicKey: string,
    text: string,
    signature: string
): boolean {
    const publicKeyBuffer = convertFromBase64(publicKey);
    const verify = crypto.createVerify("SHA256");
    verify.update(text);
    verify.end();
    return verify.verify(publicKeyBuffer, signature, "base64");
}

export default { cryptoHash, genKeyPair, signText, verifySignature };
