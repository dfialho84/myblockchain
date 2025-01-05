import {
    NewTransactionRequest,
    TransactionResponse,
} from "../../domain/value-objects/transaction-dtos";

export default class TransactionService {
    newTransaction(newTransaction: NewTransactionRequest): TransactionResponse {
        throw new Error("Method not implemented.");
    }
}
