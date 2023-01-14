const provider = require('./provider');

async function getNonce(address) {
    const response = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionCount", // <-- fill in the method
        params: [address, "pending"], // <-- fill in the params
    });

    const nonce = response.result

    return nonce;
}

module.exports = getNonce;