import BlockchainServiceImpl from "./blockchain-service-impl";
import { BlockchainService } from "../ports/in/services";
import { Registry, Peer } from "../ports/out/peers";
import { BlockcahinRepository } from "../ports/out/repositories";
import Block from "../../domain/entities/block";

describe("Blockchain Service", () => {
    let registry: Registry;
    let repository: BlockcahinRepository;
    let blockchainService: BlockchainService;

    beforeEach(() => {
        registry = {} as unknown as Registry;
        repository = {} as unknown as BlockcahinRepository;
        blockchainService = new BlockchainServiceImpl(registry, repository);
    });

    describe("sync", () => {
        describe("and there are another peers", () => {
            it("should replace the chain from the peer when its larger", () => {
                const peerBlocks: Array<Block> = [
                    {} as unknown as Block,
                    {} as unknown as Block,
                ];
                const mockPeer: Peer = {
                    ip: "123",
                    getChain: jest.fn().mockResolvedValue([]),
                };
                registry.getPeers = jest.fn().mockResolvedValue([mockPeer]);
                repository.getNumOfBlocks = jest.fn().mockResolvedValue(1);

                blockchainService.sync();

                expect(repository.).to
            });

            it("should keep the chain when the chain of the peer when it is not larger", () => {
                const mockPeer: Peer = {
                    ip: "123",
                    getChain: jest.fn().mockResolvedValue([]),
                };
                registry.getPeers = jest.fn().mockReturnValue([mockPeer]);

                expect(blockchainService.getAllBlocks(0, 100)).toEqual([]);
            });
        });

        describe("and there are no peers", () => {
            it("should verify if the first block is the genesis block", () => {
                expect(false).toBeTruthy();
            });

            it("should create a genesis block if the chain is empty", () => {
                expect(false).toBeTruthy();
            });
        });
    });

    describe("getAllBlocks", () => {
        it("should return the blocks according to the page params", () => {
            expect(false).toBeTruthy();
        });

        it("should throw an OutOfBounds Error if it is outside the bounds", () => {
            expect(false).toBeTruthy();
        });

        it("should return the number of remaining blocks if the page is the last one", () => {
            expect(false).toBeTruthy();
        });
    });
});
