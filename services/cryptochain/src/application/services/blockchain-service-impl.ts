import { BlockResponse } from "../dto/blockchain-dtos";
import { BlockchainService } from "../ports/in/services";
import { Registry } from "../ports/out/peers";
import { BlockcahinRepository } from "../ports/out/repositories";

export default class BlockchainServiceImpl implements BlockchainService {
    private registry: Registry;
    private repository: BlockcahinRepository;

    public constructor(registry: Registry, repository: BlockcahinRepository) {
        this.registry = registry;
        this.repository = repository;
    }

    public sync(): Promise<void> {
        throw new Error("Not implemented");
    }

    public getAllBlocks(offset: number, limit: number): Array<BlockResponse> {
        throw new Error("Not implemented");
    }
}
