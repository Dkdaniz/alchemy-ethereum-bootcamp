import { v4 as uuidv4 } from 'uuid';

import {
    Network, 
    Alchemy, 
    SortingOrder,
    AssetTransfersCategory,
    AssetTransfersWithMetadataParams,
    TransactionReceipt } from 'alchemy-sdk';

interface TransactionType {
    id: string;
    hash: string;
    from: string;
    to: string;
    value: number;
    fee: string;
    totalCostUsd: string;
    asset: string;
    confirmations: string;
    timestamp: number;
    type: string;
    status: string;
    message: string;
}

const settings = {
    apiKey: '2lPXXKd4FSLDU6liwHV-iLcja6VD96cB', // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const getTransactions = async (
    address: string,
    type: string
): Promise<TransactionType[]> => {
    const body: AssetTransfersWithMetadataParams = {
        category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
        order: SortingOrder.DESCENDING,
        maxCount: 1000,
        excludeZeroValue: false,
        withMetadata: true,
    };

    type === 'Send' ? (body.fromAddress = address) : (body.toAddress = address);

    const data = await alchemy.core.getAssetTransfers(body);

    const transactions = data.transfers.map((tx) => {
        const timestampObj = new Date(tx.metadata.blockTimestamp);
        const timestamp = Math.floor(timestampObj.getTime() / 1000);

        return {
            id: tx.uniqueId ? `${tx.uniqueId}:${uuidv4()}` : '',
            hash: tx.hash ? tx.hash : '',
            from: tx.from ? tx.from : '',
            to: tx.to ? tx.to : '',
            value: tx.value ? tx.value : 0.0,
            fee: '0.001',
            totalCostEth: '0.001',
            totalCostUsd: '100.00',
            asset: tx.asset ? tx.asset : '',
            confirmations: '0',
            timestamp: timestamp,
            type: type,
            status: 'completed',
            message: '',
        };
    });

    return transactions;
};

const getInfoTransactions = async (
    transactionsHistory: TransactionType[]
): Promise<(TransactionReceipt | null)[]> => {
    const callbacks = transactionsHistory.map(
        (transactionTx: TransactionType) =>
            alchemy.core.getTransactionReceipt(transactionTx.hash)
    );

    const values = await Promise.all([...callbacks]);

    return values
};

const getBlockActual = async ():Promise<number> => {
    const blockNumber = await alchemy.core.getBlockNumber()
    return blockNumber
}
export { alchemy, getTransactions, getInfoTransactions, getBlockActual }