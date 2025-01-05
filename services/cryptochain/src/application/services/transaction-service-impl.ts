import { TransactionService } from "../ports/in/services";
import {
    NewTransactionRequest,
    TransactionResponse,
} from "../../domain/value-objects/transaction-dtos";

export default class TransactionServiceImpl implements TransactionService {
    newTransaction(newTransaction: NewTransactionRequest): TransactionResponse {
        throw new Error("Method not implemented.");
    }
}
