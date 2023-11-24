import { create } from 'zustand'
import { ethers, TransactionResponse } from 'ethers';

interface MetamaskState {
    account: string,
    requestAccounts: () => Promise<void>
    sendEther: (from: string, to: string, value: string, gasPrice: string) => Promise<TransactionResponse>
}

export const useMetamaskStore = create<MetamaskState>((set) => ({
    account: '',

    requestAccounts: async () => {
        const response = await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });

        if (response && Array.isArray(response)) {
            set({ account: response[0] })
        }
    },

    sendEther: async (from: string, to: string, value: string, gasPrice: string): Promise<TransactionResponse> => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(from)

        const transaction = await signer.sendTransaction({
            to,
            gasPrice: ethers.parseUnits(gasPrice, 'gwei'),
            value: ethers.parseEther(value)
        })

        return transaction
    }
}))



