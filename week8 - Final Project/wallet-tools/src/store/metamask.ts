import { create } from 'zustand'
import { ethers, TransactionResponse } from 'ethers';
import erc20Abi from '../abis/erc20';
import disperseAbi from '../abis/disperse';

interface TokenTransactionResponse {
    transaction: TransactionResponse;
    tokenValue: string;
}

interface OptionsSendEther {
    to: string,
    value: bigint,
    gasPrice?: bigint,
}

interface OptionsDisperseSendEther {
    value: bigint,
    gasPrice?: bigint,
}

interface OptionsSendToken{
    gasPrice?: bigint,
}

interface MetamaskState {
    account: string,
    chainId: string,
    requestAccounts: () => Promise<void>
    sendEther: (from: string, recipient: string, value: string, gasPrice: string) => Promise<TransactionResponse>
    sendToken: (from: string, recipient: string, contractAddress: string, value: string, gasPrice: string) => Promise<TokenTransactionResponse>
    callTokenSymbol: (contractAddress: string) => Promise<string>
    disperseSendEther: (from: string, recipients: string[], values: string[], gasPrice: string) => Promise<TransactionResponse>
    disperseSendToken: (from: string, tokenContractAddress: string, recipients: string[], values: string[], gasPrice: string) => Promise<TokenTransactionResponse>
}

const DISPERSE_CONTRACT = import.meta.env.VITE_DISPERSE_CONTRACT;

const isSepoliaNetwork = (chainId: string) => {
    return chainId === '0xaa36a7'
}

const handleChainChanged = async (chainId: string) => {
    if (!isSepoliaNetwork(chainId)){
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
        });
    }
}

export const useMetamaskStore = create<MetamaskState>((set, get) => ({
    account: '',
    chainId: '',

    requestAccounts: async () => {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        await handleChainChanged(chainId);

        window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
            set({ account: accounts.length > 0 ? accounts[0] : '' })
        })

        window.ethereum.on('chainChanged', async (chainId: string) => {
            set({ chainId: chainId })
            await handleChainChanged(chainId)
        })

        const response = await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });

        if (response && Array.isArray(response)) {
            set({ account: response[0], chainId: chainId })
        }
    },

    sendEther: async (from: string, recipient: string, value: string, gasPrice: string): Promise<TransactionResponse> => {
        const chainId = get().chainId;
        if (!isSepoliaNetwork(chainId)) throw Error('Error: Invalid network, switch to sepolia testnet');
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(from)

        const options: OptionsSendEther = {
            to: recipient,
            value: ethers.parseEther(value)
        }

        if (gasPrice !== '') options.gasPrice === ethers.parseUnits(gasPrice, 'gwei')

        try {
            const transaction = await signer.sendTransaction(options)

            return transaction
        } catch (error) {
            throw Error('Error in create transaction')
        }
        
    },

    sendToken: async (from: string, recipient: string, contractAddress: string, value: string, gasPrice: string): Promise<TokenTransactionResponse> => {
        const chainId = get().chainId;
        if (!isSepoliaNetwork(chainId)) throw Error('Error: Invalid network, switch to sepolia testnet');

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(from)

        const erc20 = new ethers.Contract(contractAddress, erc20Abi, signer);
        try {
            const option: OptionsSendToken = {}

            if (gasPrice !== '') option.gasPrice === ethers.parseUnits(gasPrice, 'gwei')

            const transaction = await erc20.transfer(recipient, ethers.parseEther(value), option)

            return { transaction: transaction, tokenValue: value }
        } catch (error) {
            throw Error('Error in create transaction')
        }
    },

    //0x757EB835b42a584a6E89D7554991Fa542d2f1654 GLD Sepolia
    callTokenSymbol: async (contractAddress: string): Promise<string> => {
        const chainId = get().chainId;
        if (!isSepoliaNetwork(chainId)) throw Error('Error: Invalid network, switch to sepolia testnet');

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

    disperseSendEther: async (from: string, recipients: string[], values: string[], gasPrice: string): Promise<TransactionResponse> => {
        const chainId = get().chainId;
        if (!isSepoliaNetwork(chainId)) throw Error('Error: Invalid network, switch to sepolia testnet');

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(from)

        const valuesInBigInt = values.map((value) => ethers.parseEther(value))
        const totalValueTransaction = valuesInBigInt.reduce((acc, curr) => {
            return acc + curr
        });

        const erc20 = new ethers.Contract(DISPERSE_CONTRACT, disperseAbi, signer);

        const balance = await provider.getBalance(from);

        if (parseFloat(ethers.formatEther(balance)) < parseFloat(ethers.formatEther(totalValueTransaction))) {
            throw Error(`Insufficient balance. Your balance: ${parseFloat(ethers.formatEther(balance))}`)
        }

        try {
            const option: OptionsDisperseSendEther = {
                value: totalValueTransaction
            }

            if (gasPrice !== '') option.gasPrice === ethers.parseUnits(gasPrice, 'gwei')

            const transaction = await erc20.disperseEther(recipients, valuesInBigInt, option)

            return transaction
        } catch (error) {
            throw Error('Error in create transaction')
        }
    },

    disperseSendToken: async (from: string, tokenContractAddress: string, recipients: string[], values: string[], gasPrice: string): Promise<TokenTransactionResponse> => {
        const chainId = get().chainId;
        if (!isSepoliaNetwork(chainId)) throw Error('Error: Invalid network, switch to sepolia testnet');
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(from)

        const erc20 = new ethers.Contract(tokenContractAddress, erc20Abi, signer);
        const disperse = new ethers.Contract(DISPERSE_CONTRACT, disperseAbi, signer);
        const decimals = await erc20.decimals();

        const valuesInBigInt = values.map((value) => ethers.parseUnits(value, decimals))
        const totalValueTransaction = valuesInBigInt.reduce((acc, curr) => {
            return acc + curr
        });

        const balanceERC20 = await erc20.balanceOf(from);

        if (parseFloat(ethers.formatEther(balanceERC20)) < parseFloat(ethers.formatEther(totalValueTransaction))) {
            throw Error(`Insufficient balance. Your balance: ${parseFloat(ethers.formatEther(balanceERC20))}`)
        }

        const allowanceERC20 = await erc20.allowance(from, DISPERSE_CONTRACT);

        if (parseFloat(ethers.formatEther(allowanceERC20)) < parseFloat(ethers.formatEther(totalValueTransaction))) {
            const transactionApprove = await erc20.approve(DISPERSE_CONTRACT, totalValueTransaction);
            await transactionApprove.wait(1)
        }

        try {
            const option: OptionsSendToken = {}

            if (gasPrice !== '') option.gasPrice === ethers.parseUnits(gasPrice, 'gwei')

            const transaction = await disperse.disperseToken(tokenContractAddress, recipients, valuesInBigInt, option)

            return { transaction: transaction, tokenValue: ethers.formatEther(totalValueTransaction) }
        } catch (error) {
            throw Error('Error in create transaction')
        }
    }
}))



