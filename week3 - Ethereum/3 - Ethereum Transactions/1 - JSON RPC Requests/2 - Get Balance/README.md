# Get Balance

Every Ethereum address has an associated balance. You can see this balance if you go to Etherscan: here's an [example address](https://etherscan.io/address/0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf).

## 🏁 Your Goal: Retrieve the Balance

We're going to make another JSON-RPC call just like we did on the last stage! This time we're going to retrieve the balance of an address using [eth_getBalance](https://docs.alchemy.com/reference/eth-getbalance?a=dkdaniz).

☝️ This method requires you to fill in two parameters: an address and a block number (or a block tag, which is one of the strings: `"pending"`, `"latest"`, `"safe"`,`"finalized"`, or `"earliest"` - you can learn more about blog tags on the [docs](https://docs.alchemy.com/reference/eth-getbalance?a=dkdaniz)).

1. Get the balance for the address passed into our `getBalance` function and return it
2. We're going to want to get the balance as of the most recently mined block (`"latest"`)

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
