import { v4 as uuidv4 } from 'uuid';
import erc20Abi from '../tools/erc20';

import {
    Network, 
    Alchemy, 
    SortingOrder,
    AssetTransfersCategory,
    AssetTransfersWithMetadataParams,
    TransactionReceipt } from 'alchemy-sdk';
import { ethers } from 'ethers';

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
    network: Network.ETH_SEPOLIA, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const getSymbol = async (contractAddress: string):Promise<string> => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const erc20 = new ethers.Contract(contractAddress, erc20Abi, provider);

    let symbol: string;

    try {
        symbol = await erc20.symbol.staticCall();
    } catch (error) {
        symbol = 'Token'
    }

    return symbol
}

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

        const txValue = tx.value ? tx.value : 0.0;
        const value = tx.category === 'external' ? txValue : parseFloat(ethers.formatEther(BigInt(tx.rawContract.value ? tx.rawContract.value : '0x0')))

        return {
            id: tx.uniqueId ? `${tx.uniqueId}:${uuidv4()}` : '',
            hash: tx.hash ? tx.hash : '',
            from: tx.from ? tx.from : '',
            to: tx.to ? tx.to : '',
            value: value,
            fee: '0.001',
            totalCostEth: '0.001',
            totalCostUsd: '100.00',
            asset: tx.asset ? tx.asset : 'TOKEN',
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