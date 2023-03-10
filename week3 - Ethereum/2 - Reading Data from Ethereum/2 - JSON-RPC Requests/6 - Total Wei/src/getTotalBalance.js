require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {

    const batch = []

    for (i = 0; i < addresses.length; i++) {
        const request = {
            jsonrpc: "2.0",
            id: i,
            method: "eth_getBalance",
            params: [addresses[i]]
        }

        batch.push(request)
    }

    const { data } = await axios.post(url, batch);

    const totalBalance = data.reduce((acc, cur) => parseInt(acc, 16) + parseInt(cur.result, 16), 0)

    return totalBalance;
}

module.exports = getTotalBalance;