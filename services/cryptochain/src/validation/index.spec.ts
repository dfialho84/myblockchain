import { z } from "zod";
import { validateRequestBody, ApiError } from "./index";
import { Request, Response, NextFunction } from "express";
import exp from "constants";
import { error } from "console";

describe("validation", () => {
    describe("validateRequest", () => {
        const next: NextFunction = jest.fn();
        const schema = z.object({
            test: z.number().min(10, "xxxxx"),
        });

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should validate the request body", () => {
            const res: Response = {} as unknown as Response;

            const validationFn = validateRequestBody(schema);
            const req: Request = {} as unknown as Request;

            req.body = { test: 12 };

            validationFn(req, res, next);

            expect(next).toHaveBeenCalled();
        });

        it("should return a 400 status code and the validation errors", () => {
            const res: Response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            const validationFn = validateRequestBody(schema);
            const req: Request = {} as unknown as Request;

            req.body = { test: 5 };

            const error: ApiError = {
                code: 400,
                messages: ["xxxxx"],
            };

            validationFn(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(error);
        });
    });
});
