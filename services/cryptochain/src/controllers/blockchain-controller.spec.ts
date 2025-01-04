import { Request, Response } from "express";
import BlockchainService from "../services/blockchain-service";
import BlockchainController from "./blockchain-controller";
import { BlockResponse } from "../dtos/blockchain-dtos";
import { ApiError } from "../validation";
import { OutOfBoundsError } from "../exceptions";

describe("blockchain-controller", () => {
    let blockchainController: BlockchainController;
    let blockchainService: BlockchainService;

    beforeEach(() => {
        blockchainService = {} as unknown as BlockchainService;
        blockchainController = new BlockchainController(blockchainService);
    });

    describe("getAllBlocks", () => {
        it("should return the blocks according to the page params", () => {
            const req = {
                locals: {
                    pagination: {
                        offset: 2,
                        page: 1,
                        limit: 2,
                    },
                },
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            const blocks: Array<BlockResponse> = [
                {
                    timestamp: 1,
                    lastHash: "lastHash",
                    data: "data",
                    hash: "hash",
                },
                {
                    timestamp: 1,
                    lastHash: "lastHash",
                    data: "data",
                    hash: "hash",
                },
            ];
            blockchainService.getAllBlocks = jest.fn().mockReturnValue(blocks);
            blockchainController.getAllBlocks(req, res);

            expect(blockchainService.getAllBlocks).toHaveBeenCalledWith(2, 2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(blocks);
        });

        it("should return `NOT FOUND` if the page is outside the bounds", () => {
            const req = {
                locals: {
                    pagination: {
                        offset: 2,
                        page: 2,
                        limit: 2,
                    },
                },
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            blockchainService.getAllBlocks = jest
                .fn()
                .mockImplementation(() => {
                    throw new OutOfBoundsError("Page out of bounds");
                });
            const expectedError: ApiError = {
                code: 404,
                messages: ["Page out of bounds"],
            };

            blockchainController.getAllBlocks(req, res);

            expect(blockchainService.getAllBlocks).toHaveBeenCalledWith(2, 2);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(expectedError);
        });

        it("should return 500 if there is any problem on the service", () => {
            const req = {
                locals: {
                    pagination: {
                        offset: 2,
                        page: 2,
                        limit: 2,
                    },
                },
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            blockchainService.getAllBlocks = jest
                .fn()
                .mockImplementation(() => {
                    throw new Error("Internal Problem");
                });
            const expectedError: ApiError = {
                code: 500,
                messages: ["Internal Problem"],
            };

            blockchainController.getAllBlocks(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expectedError);
        });

        it("should return the page 1 if the param is not provided", () => {
            const req = {
                locals: {
                    pagination: {
                        limit: 5,
                    },
                },
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;
            blockchainService.getAllBlocks = jest.fn();

            blockchainController.getAllBlocks(req, res);

            expect(blockchainService.getAllBlocks).toHaveBeenCalledWith(0, 5);
        });

        it("should return a page of default size if the param is not privided", () => {
            const req = {
                locals: {
                    pagination: {
                        offset: 2,
                    },
                },
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;
            blockchainService.getAllBlocks = jest.fn();

            blockchainController.getAllBlocks(req, res);

            expect(blockchainService.getAllBlocks).toHaveBeenCalledWith(2, 10);
        });
    });
});
