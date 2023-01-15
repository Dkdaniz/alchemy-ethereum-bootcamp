const ethers = require('ethers');
const { Wallet, utils } = ethers;

const { wallet1 } = require('./wallets');

// TODO: replace all undefined values
const signaturePromise = wallet1.signTransaction({
    value: ethers.utils.parseUnits('1', 'ether'),
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92", 
    gasLimit: 21000,
});

module.exports = signaturePromise;