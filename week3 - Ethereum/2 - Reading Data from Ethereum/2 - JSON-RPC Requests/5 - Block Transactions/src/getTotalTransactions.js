require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalTransactions(blockNumber) {
    const { data } = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockTransactionCountByNumber",
        params: [blockNumber],
    });

    return data.result;
}

module.exports = getTotalTransactions;