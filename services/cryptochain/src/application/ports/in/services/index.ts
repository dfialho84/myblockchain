import { BlockResponse } from "../../../../domain/value-objects/blockchain-dtos";
import { NewWalletResponse } from "../../../../domain/value-objects/wallet-dtos";
import {
    TransactionResponse,
    NewTransactionRequest,
} from "../../../../domain/value-objects/transaction-dtos";

export interface BlockchainService {
    getAllBlocks: (offset: number, limit: number) => Array<BlockResponse>;
}

export interface WalletService {
    createWallet: () => NewWalletResponse;
}

export interface TransactionService {
    newTransaction: (
        newTransaction: NewTransactionRequest
    ) => TransactionResponse;
}
