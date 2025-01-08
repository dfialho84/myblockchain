import {
    BlockchainEventListener,
    NewBlockEvent,
} from "../../ports/in/listerners";
import { BlockchainPeerProxy } from "../../ports/out/peers";
import { BlockcahinRepository } from "../../ports/out/repositories";

export default class BlockchainSyncer implements BlockchainEventListener {
    constructor(
        private blockchainRepository: BlockcahinRepository,
        private blockchainProxy: BlockchainPeerProxy
    ) {}

    public intialSync(): Promise<void> {
        throw new Error("Not implemented");
    }

    public onNewBlock(event: NewBlockEvent): Promise<void> {
        throw new Error("Not implemented");
    }
}
