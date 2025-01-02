import {
    NewTransactionRequest,
    TransactionResponse,
} from "../dtos/transaction-dtos";

export default class TransactionService {
    newTransaction(newTransaction: NewTransactionRequest): TransactionResponse {
        throw new Error("Method not implemented.");
    }
}
