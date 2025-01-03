import "express";

declare global {
    namespace Express {
        interface Pagination {
            offset: number;
            page: number;
            limit: number;
        }
        interface Locals {
            pagination?: Pagination;
        }
        interface Request {
            locals?: Locals;
        }
    }
}
