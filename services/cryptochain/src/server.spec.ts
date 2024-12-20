import request from "supertest";
import app from "./app";

describe("Server", () => {
    it("should respond with a 200 status code on the root path", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
    });

    it("should respond with a 404 status code for an unknown path", async () => {
        const response = await request(app).get("/unknown-path");
        expect(response.status).toBe(404);
    });
});
