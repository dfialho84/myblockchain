import { WalletService } from "../ports/in/services";
import { NewWalletResponse } from "../../domain/value-objects/wallet-dtos";
import { genKeyPair } from "../../domain/entities/crypto-hash";

export default class WalletServiceImpl implements WalletService {
    createWallet(): NewWalletResponse {
        const { publicKey: address, privateKey } = genKeyPair();
        return { address, privateKey };
    }
}
