const axios = require('axios');

// grab the API key from the .env
require('dotenv').config();
const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`;

async function getBlockNumber() {
    const { data } = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber", // <-- TODO: fill in the method name
    });

    const blockNumber = data.result

    return blockNumber;
}

module.exports = getBlockNumber;