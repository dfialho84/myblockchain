import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export type ApiError = {
    code: number;
    messages: string[];
};

export const validateRequestBody = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate request body, query, or params
            schema.parse(req.body);
            next(); // Proceed to the next middleware/controller if validation succeeds
        } catch (err: unknown) {
            const error = err as z.ZodError;
            res.status(400).json({
                code: 400,
                messages: error.errors.map((e) => e.message),
            }); // Return validation errors
        }
    };
};
