import { Request, Response } from "express";
import WalletController from "./wallet-controller";
import WalletService from "../services/wallet-service";
import { NewWalletResponse } from "../dtos/wallet-dtos";

describe("WalletController", () => {
    let walletService: WalletService;
    let walletController: WalletController;

    beforeEach(() => {
        walletService = jest.fn() as unknown as WalletService;
        walletController = new WalletController({ walletService });
    });

    describe("newWallet", () => {
        it("should create a new wallet", async () => {
            let res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            walletService.createWallet = jest.fn().mockReturnValue({
                address: "address",
                privateKey: "privateKey",
            } as NewWalletResponse);

            walletController.newWallet({} as Request, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                address: "address",
                privateKey: "privateKey",
            });
        });
    });
});
