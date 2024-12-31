import { Express } from "express";
import RegistryClient from "../infrastructure/registry-client";
import WalletController from "../controllers/wallet-controller";
import WalletService from "../services/wallet-service";

class Config {
    private _registryClient: RegistryClient | null;
    private _walletService: WalletService;
    private _walletController: WalletController;

    constructor() {
        this._registryClient = null;
        this._walletService = new WalletService();
        this._walletController = new WalletController({
            walletService: this._walletService,
        });
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
}

export default new Config();
