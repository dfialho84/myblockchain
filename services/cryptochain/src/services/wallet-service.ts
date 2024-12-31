import { NewWalletResponse } from "../dtos/wallet-dtos";
import { genKeyPair } from "../domain/crypto-hash";

export default class WalletService {
    createWallet(): NewWalletResponse {
        const { publicKey: address, privateKey } = genKeyPair();
        return { address, privateKey };
    }
}
