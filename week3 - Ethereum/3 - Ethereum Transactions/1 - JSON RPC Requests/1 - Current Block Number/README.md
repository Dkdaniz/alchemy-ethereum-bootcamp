# Current Block Number

Let's focus on that example from the previous stage:

The Ethereum Blockchain adds a new block about every 12 seconds ⌛.

> 🎂 The first Ethereum block was [block #0](https://etherscan.io/block/0) mined on July 30th, 2015. If you visit the main [etherscan homepage](https://etherscan.io/) you'll see all the latest blocks mined.

We can also find the latest block number from an Ethereum Node using its **`JSON-RPC API`**! When we build production grade applications we'll use our Alchemy endpoint to fetch data from on-chain, however, for the purpose of this exercise we'll be using [ganache-core](https://github.com/trufflesuite/ganache) instead.

## 🏁 Your Goal: Current Block Number

Let's make an JSON-RPC call to an Ethereum Node! We're going to use the `send` method on the `provider`.

> 🔍 The **`provider`** we're using in this case is from [ganache-core](https://github.com/trufflesuite/ganache).

1. Update the getBlockNumber function to retrieve the current block number. The method we're going to use is called **`eth_blockNumber`**.
2. Once you recieve the response from the JSON-RPC call, pull the `result` from the response. Return this `result` as the current block number.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
