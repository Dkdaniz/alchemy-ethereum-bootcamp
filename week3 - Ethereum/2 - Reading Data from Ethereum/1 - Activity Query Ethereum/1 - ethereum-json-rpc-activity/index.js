const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const API_KEY = process.env.API_KEY;

const run = async () => {

    try {
        const response = await axios.post(`https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBlockByNumber",
            params: [
                "0x1ba", // block 436
                true  // retrieve the full transaction object in transactions array
            ]
        })

        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

run();

