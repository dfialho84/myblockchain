export type TransactionResponse = {
    id: string;
    input: {
        timestamp: number;
        amount: number;
        address: string;
    };
    outputs: {
        [key: string]: number;
    };
    signature: string;
};

export type NewTransactionRequest = Omit<TransactionResponse, "id">;
