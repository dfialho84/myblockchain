import { Express } from "express";
import RegistryClient from "../adapters/out/registry/registry-client";
import WalletController from "../adapters/in/http/controllers/wallet-controller";
import WalletService from "../application/services/wallet-service";
import TransactionService from "../application/services/transaction-service";
import TransactionController from "../adapters/in/http/controllers/transaction-controller";

class Config {
    private _registryClient: RegistryClient | null;
    private _walletService: WalletService;
    private _walletController: WalletController;
    private _transactionService: TransactionService;
    private _transactionController: TransactionController;

    constructor() {
        this._registryClient = null;
        this._walletService = new WalletService();
        this._walletController = new WalletController({
            walletService: this._walletService,
        });
        this._transactionService = new TransactionService();
        this._transactionController = new TransactionController(
            this._transactionService
        );
    }

    init(app: Express) {
        const register = process.env.REGISTER === "true";
        if (register) {
            this._registryClient = new RegistryClient(app);
            this._registryClient.start();
        }
    }

    get walletController() {
        return this._walletController;
    }

    get transactionController() {
        return this._transactionController;
    }
}

export default new Config();
