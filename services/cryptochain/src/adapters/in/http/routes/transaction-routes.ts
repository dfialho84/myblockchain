import { Router, Request, Response } from "express";
import config from "../../../../config";
import { validateRequestBody } from "../validation";
import { newTransactionSchema } from "../validation/transaction-schemas";

const router = Router();

router.post(
    "/",
    validateRequestBody(newTransactionSchema),
    (req: Request, res: Response) => {
        config.transactionController.newTransaction(req, res);
    }
);

export default router;
