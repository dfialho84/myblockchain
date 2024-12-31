import request from "supertest";
import app from "../app";

describe("Wallet Endpoints", () => {
    beforeAll(() => {
        jest.restoreAllMocks();
    });

    it("should create a new wallet", async () => {
        const res = await request(app).post("/api/v1/wallet/new").send();
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("address");
        expect(res.body).toHaveProperty("privateKey");
    });
});
