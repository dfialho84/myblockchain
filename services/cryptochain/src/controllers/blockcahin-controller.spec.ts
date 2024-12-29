import request from "supertest";
import app from "../app";

const mock = jest.fn();

jest.mock("../services/blockchain-service", () => ({
    getAllBlocks: () => mock(),
}));

describe("Blockchain Controller", () => {
    describe("getAllBlocks", () => {
        beforeEach(() => {
            mock.mockRestore();
        });

        it("should return and empty list of blocks when the service is empty", async () => {
            mock.mockReturnValue([]);
            const response = await request(app).get("/api/v1/blocks");

            expect(response.status).toBe(200);
            expect(response.body.blocks).toBeInstanceOf(Array);
            expect(response.body.blocks.length).toBe(0);
        });

        it("should get the blockchain", async () => {
            mock.mockReturnValue([
                {
                    timestamp: 123456,
                    lastHash: "lastHash",
                    data: "data",
                    hash: "hash",
                },
            ]);
            const response = await request(app).get("/api/v1/blocks");

            expect(response.status).toBe(200);
            expect(response.body.blocks).toBeInstanceOf(Array);
            expect(response.body.blocks.length).toBe(1);
            expect(response.body.blocks[0]).toEqual({
                timestamp: 123456,
                lastHash: "lastHash",
                data: "data",
                hash: "hash",
            });
        });
    });
});
