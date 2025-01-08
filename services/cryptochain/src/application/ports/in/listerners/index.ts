export type NewBlockEvent = {};

export interface BlockchainEventListener {
    onNewBlock: (event: NewBlockEvent) => Promise<void>;
}
