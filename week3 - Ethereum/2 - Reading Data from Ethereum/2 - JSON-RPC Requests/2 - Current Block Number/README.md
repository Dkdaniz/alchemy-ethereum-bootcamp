# Current Block Number

The Ethereum Blockchain adds a new block about every 12 seconds ⌛.

> 🎂 The first Ethereum block was [block #0](https://etherscan.io/block/0) mined on July 30th, 2015. If you visit the main etherscan homepage you'll see all the latest blocks mined.

We can also always find this information on a Mainnet Ethereum Node by using **`Alchemy's JSON-RPC API`**!

## 🏁 Your Goal: Current Block Number

Let's ask Mainnet Ethereum what the current block number is! To do this, we'll make a JSON RPC request to our Alchemy endpoint using the axios http library and using dotenv to load our api key environment variable.

1. Update the `getBlockNumber` function to retrieve the current block number. The method we're going to use is called **`eth_blockNumber`**.
2. Take a look at the response you get back in the `console.log`. Can you find the block number and return it?

> 📖 You can learn more about the [axios response object](https://axios-http.com/docs/res_schema) here. The data is what the JSON RPC API responded with! This will match the response body documented in Alchemy's reference for the [eth_blockNumber method](https://docs.alchemy.com/reference/eth-blocknumber).

> 👀 In future exercises, requests like this will become even easier with the [Alchemy SDK](https://www.alchemy.com/sdk)!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
