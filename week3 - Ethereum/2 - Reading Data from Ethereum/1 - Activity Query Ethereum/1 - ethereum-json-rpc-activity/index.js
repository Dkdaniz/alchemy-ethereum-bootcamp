const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = process.env.ALCHEMY_URL;

const run = async () => {

    try {
        const response = await axios.post(ALCHEMY_URL, {
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

