import { Request, Response } from "express";
import TransactionController from "./transaction-controller";
import { TransactionResponse } from "../dtos/transaction-dtos";

describe("TransactionController", () => {
    let transactionController: TransactionController;

    beforeEach(() => {
        transactionController = new TransactionController();
    });

    describe("newTransaction", () => {
        it("should create a new transactioon", () => {
            let res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            transactionController.newTransaction({} as Request, res);

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

            expect(true).toBe(false);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });

        it("should throw an expection when the service does not accept the transaction", () => {
            expect(false).toBeTruthy();
        });
    });
});
