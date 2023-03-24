require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");
const { firstTopic, secondTopic } = require('./topics');

const topics = [firstTopic(), secondTopic()].map((x) => '0x' + x);

const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

async function totalDaiTransferred(fromBlock, toBlock) {
    const logs = await alchemy.core.getLogs({
        address: "0x6b175474e89094c44da98b954eedeac495271d0f", // <-- TODO #1: fill in the dai address here
        fromBlock,
        toBlock,
        topics
    });

    let totalTransferred = BigInt(0);


    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];

        if (log.topics[0] === topics[0] && log.topics[1] === topics[1]) {
            var value = BigInt(log.data, 16);
            totalTransferred += value;
        }
    }

    return totalTransferred.toString();
}

module.exports = totalDaiTransferred;