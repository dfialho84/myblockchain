import crypto from "crypto";

export default function cryptoHash(...inputs: string[]): string {
    if (inputs.length === 0) {
        throw new Error("Empty input arguments");
    }
    const data = inputs.sort().join(" ");
    return crypto.createHash("sha256").update(data).digest("hex");
}
