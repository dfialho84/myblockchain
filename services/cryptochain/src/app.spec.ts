import request from "supertest";
import app from "./app";
import {
    NewTransactionRequest,
    TransactionResponse,
} from "./dtos/transaction-dtos";

describe("Endpoints integration tests", () => {
    beforeAll(() => {
        jest.restoreAllMocks();
    });

    it("should create a new wallet", async () => {
        const res = await request(app).post("/api/v1/wallets").send();
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("address");
        expect(res.body).toHaveProperty("privateKey");
    });

    it("should create a transaction", async () => {
        const reqData: NewTransactionRequest = {
            input: {
                timestamp: 0,
                amount: 0,
                address: "address",
            },
            outputs: {
                address: 0,
            },
            signature: "signature",
        };

        const res = await request(app)
            .post("/api/v1/transactions")
            .send(reqData);
        expect(res.statusCode).toEqual(201);

        const transaction: TransactionResponse = res.body;

        expect(transaction).toHaveProperty("id");
        expect(transaction).toHaveProperty("input");
        expect(transaction).toHaveProperty("outputs");
        expect(transaction).toHaveProperty("signature");
    });
});
