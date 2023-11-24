import { create } from 'zustand'
import { ethers, TransactionResponse } from 'ethers';
import erc20Abi from '../tools/erc20';

interface TokenTransactionResponse {
    transaction: TransactionResponse;
    tokenValue: string;
}

interface MetamaskState {
    account: string,
    requestAccounts: () => Promise<void>
    sendEther: (from: string, recipient: string, value: string, gasPrice: string) => Promise<TransactionResponse>
    sendToken: (from: string, recipient: string, contractAddress: string, value: string, gasPrice: string) => Promise<TokenTransactionResponse>
    callTokenSymbol: (contractAddress: string) => Promise<string>
}

export const useMetamaskStore = create<MetamaskState>((set) => ({
    account: '',

    requestAccounts: async () => {
        const response = await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });

        if (response && Array.isArray(response)) {
            set({ account: response[0] })
        }
    },

    sendEther: async (from: string, recipient: string, value: string, gasPrice: string): Promise<TransactionResponse> => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(from)

        try {
            const transaction = await signer.sendTransaction({
                to: recipient,
                gasPrice: ethers.parseUnits(gasPrice, 'gwei'),
                value: ethers.parseEther(value)
            })

            return transaction
        } catch (error) {
            throw Error('Error in create transaction')
        }
        
    },

    sendToken: async (from: string, recipient: string, contractAddress: string, value: string, gasPrice: string): Promise<TokenTransactionResponse> => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(from)

        const erc20 = new ethers.Contract(contractAddress, erc20Abi, signer);
        try {
            const transaction = await erc20.transfer(recipient, ethers.parseEther(value), { gasPrice: ethers.parseUnits(gasPrice, 'gwei') })

            return { transaction: transaction, tokenValue: value }
        } catch (error) {
            throw Error('Error in create transaction')
        }
    },

    //0x757EB835b42a584a6E89D7554991Fa542d2f1654 GLD Sepolia
    callTokenSymbol: async (contractAddress: string): Promise<string> => {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const erc20 = new ethers.Contract(contractAddress, erc20Abi, provider);

        let symbol: string;

        try {
            symbol = await erc20.symbol.staticCall();
        } catch (error) {
            symbol = 'Token'
        }

        return symbol
    },
}))



