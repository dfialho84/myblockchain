export type TransactionEntry = {
    address: string;
    amount: number;
};

export type Transaction = {
    sender: TransactionEntry;
    recipients: TransactionEntry[];
    signature: string;
};
