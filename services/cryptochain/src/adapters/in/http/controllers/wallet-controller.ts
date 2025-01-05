import { Request, Response } from "express";
import WalletService from "../../../../application/services/wallet-service";

type NewWalletController = {
    walletService: WalletService;
};

export default class WalletController {
    private walletService: WalletService;

    constructor({ walletService: WalletService }: NewWalletController) {
        this.walletService = WalletService;
    }
    newWallet(req: Request, res: Response) {
        res.status(201).json(this.walletService.createWallet());
    }
}
