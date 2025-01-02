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

    describe("/blocks", () => {
        it("should return the blockchain", async () => {
            const res = await request(app).get("/api/v1/blocks").send();
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("blocks");
        });
    });

    describe("/wallets", () => {
        it("should create a new wallet", async () => {
            const res = await request(app).post("/api/v1/wallets").send();
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("address");
            expect(res.body).toHaveProperty("privateKey");
        });
    });

    describe("transactions", () => {
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

        it("should validate a transaction", async () => {
            const reqData: Partial<NewTransactionRequest> = {
                outputs: {
                    address: 0,
                },
                signature: "signature",
            };

            const res = await request(app)
                .post("/api/v1/transactions")
                .send(reqData);
            expect(res.statusCode).toEqual(400);
        });
    });
});
