const { Wallet, utils, providers } = require('ethers');
const { ganacheProvider, PRIVATE_KEY } = require('./config');

// TODO: replace undefined with a new web3 provider
const provider = new providers.Web3Provider(ganacheProvider);; 

const wallet = new Wallet(PRIVATE_KEY, provider);

async function sendEther({ value, to }) {
    const nonce = wallet.getTransactionCount('pending');
    const tx = await wallet.sendTransaction({ 
        value, 
        to, 
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00 ,
        nonce
    });

    return tx;
}

module.exports = sendEther;