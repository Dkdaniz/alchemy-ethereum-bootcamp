import { v4 as uuidv4 } from 'uuid';
import erc20Abi from '../abis/erc20';

import {
    Network, 
    Alchemy, 
    SortingOrder,
    AssetTransfersCategory,
    AssetTransfersWithMetadataParams,
    TransactionReceipt,
 } from 'alchemy-sdk';
import { ethers } from 'ethers';

interface TransactionType {
    id: string;
    hash: string;
    from: string;
    to: string;
    value: string;
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
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_SEPOLIA, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const getSymbol = async (contractAddress: string | null):Promise<string> => {
    if (!contractAddress) return 'TOKEN';

    const provider = new ethers.BrowserProvider(window.ethereum);

    const erc20 = new ethers.Contract(contractAddress, erc20Abi, provider);

    let symbol: string;

    try {
        symbol = await erc20.symbol.staticCall();
    } catch (error) {
        symbol = 'TOKEN'
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
        maxCount: 100,
        excludeZeroValue: false,
        withMetadata: true,
    };

    type === 'Send' ? (body.fromAddress = address) : (body.toAddress = address);

    const data = await alchemy.core.getAssetTransfers(body);

    const transactions = []

    for (let i = 0; i < data.transfers.length; i++) {
        const tx = data.transfers[i];
        
        const timestampObj = new Date(tx.metadata.blockTimestamp);
        const timestamp = Math.floor(timestampObj.getTime() / 1000);

        const txValue = tx.value ? tx.value.toString() : '0.00';
        const value = tx.category === 'external' ? txValue.toString() : ethers.formatEther(BigInt(tx.rawContract.value ? tx.rawContract.value : '0x0'))
        
        let asset = tx.asset ? tx.asset : 'ETH';
        if (!tx.asset && tx.category === 'erc20') {
            asset = await getSymbol(tx.rawContract.address)
        }

        transactions.push({
            id: tx.uniqueId ? `${tx.uniqueId}:${uuidv4()}` : '',
            hash: tx.hash ? tx.hash : '',
            from: tx.from ? tx.from : '',
            to: tx.to ? tx.to : '',
            value: value,
            fee: '0.001',
            totalCostEth: '0.001',
            totalCostUsd: '100.00',
            asset: asset,
            confirmations: '0',
            timestamp: timestamp,
            type: type,
            status: 'completed',
            message: '',
        });
    }

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