import { BlockResponse } from "../../../dto/blockchain-dtos";
import { NewWalletResponse } from "../../../dto/wallet-dtos";
import {
    TransactionResponse,
    NewTransactionRequest,
} from "../../../dto/transaction-dtos";

export interface BlockchainService {
    sync: () => Promise<void>;
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
