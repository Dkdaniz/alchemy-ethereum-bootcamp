const provider = require('./provider');

async function getTotalBalance(addresses) {
    const requestBatch = addresses.map(address => {
        return {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [address],
        }
    })

    const response = await provider.send(requestBatch);

    const totalBalance = response.reduce((acc,cur) => {
        return acc + parseInt(cur.result, 16)
    },0);
    
    return totalBalance;
}

module.exports = getTotalBalance;