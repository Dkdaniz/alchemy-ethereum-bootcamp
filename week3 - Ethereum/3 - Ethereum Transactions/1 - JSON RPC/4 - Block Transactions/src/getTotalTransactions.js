const provider = require('./provider');

async function getTotalTransactions(blockNumber) {
    const response = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockTransactionCountByNumber",
        params: [blockNumber], 
    });

    const totalTransactions = response.result;

    return totalTransactions;
}

module.exports = getTotalTransactions;