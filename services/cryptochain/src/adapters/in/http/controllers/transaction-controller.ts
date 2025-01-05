import { Request, Response } from "express";
import { TransactionService } from "../../../../application/ports/in/services";

export default class TransactionController {
    private transactionService: TransactionService;

    constructor(transactionService: TransactionService) {
        this.transactionService = transactionService;
    }

    newTransaction(req: Request, res: Response) {
        try {
            const newTransaction = this.transactionService.newTransaction(
                req.body
            );
            res.status(201);
            res.json(newTransaction);
        } catch (err: unknown) {
            res.status(400).json({
                code: 400,
                messages: [(err as Error).message],
            });
        }
    }
}
