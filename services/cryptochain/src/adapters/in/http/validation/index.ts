import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export type ApiError = {
    code: number;
    messages: string[];
};

export const validateRequestBody = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err: unknown) {
            const error = err as z.ZodError;
            res.status(400).json({
                code: 400,
                messages: error.errors.map((e) => e.message),
            });
        }
    };
};
