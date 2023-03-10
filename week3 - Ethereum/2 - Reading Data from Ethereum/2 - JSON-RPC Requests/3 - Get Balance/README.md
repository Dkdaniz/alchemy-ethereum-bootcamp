# Alchemy JSON RPC Tools

As you're going through these exercises, be sure to check out:

- Alchemy Explorer - Check it out! The JSON RPC requests you're making in these exercises will show up here: https://dashboard.alchemy.com/explorer
- Alchemy Composer - If you ever want to quickly run a JSON RPC method, this is the easiest place to do it: https://dashboard.alchemy.com/composer

# Balances

Let's talk about ether balances! Every Ethereum address has an associated balance. This is true whether it's an Externally Owned Account, or a smart contract! You can see this balance if you go to Etherscan: here's an [example address](https://etherscan.io/address/0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf).

## 🏁 Your Goal: Retrieve the Balance

We're going to make another JSON-RPC call just like we did on the last stage! This time we're going to retrieve the balance of an address using [eth_getBalance](https://docs.alchemy.com/reference/eth-getbalance).

☝️ This method requires you to fill in two parameters: an address and an optional block number. If you leave the block number blank, it will default to the latest block.

> 📖 The block number parameter actually accepts several different types of arguments, you can learn more in the [docs](https://docs.alchemy.com/reference/eth-getbalance).

1. Get the latest balance for the address passed into our `getBalance` function and return it.
   
> 👀 Be sure to use the "latest" tag for the block number or you can leave it blank!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
