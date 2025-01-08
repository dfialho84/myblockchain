import { Express } from "express";
import RegistryClient from "../adapters/out/registry/registry-client";
import WalletController from "../adapters/in/http/controllers/wallet-controller";
import {
    BlockchainService,
    WalletService,
} from "../application/ports/in/services";
import WalletServiceImpl from "../application/services/wallet-service-impl";
import { TransactionService } from "../application/ports/in/services";
import TransactionServiceImpl from "../application/services/transaction-service-impl";
import TransactionController from "../adapters/in/http/controllers/transaction-controller";
import BlockchainServiceImpl from "../application/services/blockchain-service-impl";

class Config {
    private _registryClient: RegistryClient | null;
    private _walletService: WalletService;
    private _walletController: WalletController;
    private _transactionService: TransactionService;
    private _transactionController: TransactionController;
    private _blockchainService: BlockchainService;

    constructor() {
        this._registryClient = null;
        this._walletService = new WalletServiceImpl();
        this._walletController = new WalletController({
            walletService: this._walletService,
        });
        this._transactionService = new TransactionServiceImpl();
        this._transactionController = new TransactionController(
            this._transactionService
        );
        this._blockchainService = new BlockchainServiceImpl();
    }

    async init(app: Express) {
        const register = process.env.REGISTER === "true";
        if (register) {
            this._registryClient = new RegistryClient(app);
            this._registryClient.start();
        }
        await this.blockcainService.sync();
    }

    get walletController(): WalletController {
        return this._walletController;
    }

    get transactionController(): TransactionController {
        return this._transactionController;
    }

    get blockcainService(): BlockchainService {
        return this._blockchainService;
    }
}

export default new Config();
