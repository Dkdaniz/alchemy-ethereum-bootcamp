const provider = require('./provider');

async function getBlockNumber() {
    const response = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
    });

    const blockNumber = response.result

    return blockNumber;
}

module.exports = getBlockNumber;