import { Request, Response } from "express";
import TransactionController from "./transaction-controller";
import { TransactionService } from "../../../../application/ports/in/services";
import { TransactionResponse } from "../../../../domain/value-objects/transaction-dtos";
import { ApiError } from "../validation";

describe("TransactionController", () => {
    let transactionService: TransactionService;
    let transactionController: TransactionController;

    beforeEach(() => {
        transactionService = {} as TransactionService;
        transactionController = new TransactionController(transactionService);
    });

    describe("newTransaction", () => {
        let res: Response;
        beforeEach(() => {
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;
        });

        it("should create a new transactioon", () => {
            const expectedResponse: TransactionResponse = {
                id: "id",
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
            transactionService.newTransaction = jest
                .fn()
                .mockReturnValue(expectedResponse);

            transactionController.newTransaction({} as Request, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });

        it("should throw an expection when the service does not accept the transaction", () => {
            transactionService.newTransaction = jest
                .fn()
                .mockImplementation(() => {
                    throw new Error("Transaction not accepted");
                });

            const expectedError: ApiError = {
                code: 400,
                messages: ["Transaction not accepted"],
            };

            transactionController.newTransaction({} as Request, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expectedError);
        });
    });
});
