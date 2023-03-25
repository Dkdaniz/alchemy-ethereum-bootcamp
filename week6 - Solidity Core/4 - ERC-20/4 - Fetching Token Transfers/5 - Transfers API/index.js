require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");

const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

async function totalErc20Transfers(fromBlock, toBlock) {
    const res = await alchemy.core.getAssetTransfers({
        fromBlock,
        toBlock,
        fromAddress: "0x28c6c06298d514db089934071355e5743bf21d60", // <-- TODO: fill this in
        category: ['erc20'], // <-- TODO: fill this in 
    });

    // inspect the response to see all the transfers
    // console.log(res.transfers.length); 

    return res.transfers.length
}

module.exports = totalErc20Transfers;