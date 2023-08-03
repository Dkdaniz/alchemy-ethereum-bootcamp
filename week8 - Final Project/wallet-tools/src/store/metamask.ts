import { create } from 'zustand'

// interface RequestArguments {
//     method: string;
//     params?: unknown[] | object;
// }

interface MetamaskState {
    account: string,
    requestAccounts: () => Promise<void>
}

export const useMetamaskStore = create<MetamaskState>((set) => ({
    account: '',

    requestAccounts: async () => {
        const response = await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });

        if (response && Array.isArray(response)) {
            set({ account: response[0] })
        }
    }


}))



