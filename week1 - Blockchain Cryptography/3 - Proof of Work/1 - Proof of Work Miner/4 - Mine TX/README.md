# Block Size

In Bitcoin, there is a specific block size limit that cannot be exceeded. The number of transactions that will fit inside of a block varies due to transactions being of all different sizes.

For the purposes of this exercise, we will use the `MAX_TRANSACTIONS` constant.

> 📖 Deciding the block size in bitcoin has been [quite controversial](https://en.bitcoin.it/wiki/Block_size_limit_controversy!)

## 🏁 Your Goal: Mine Transactions

1. Inside the `mine` function, pull transactions off the mempool and include them in the block in an array called `transactions`
2. Remove each transaction you include in the block from the `mempool`
3. Add the `transactions` array to the block before hashing the block

>⚠️ Do not include more transactions in the block than the `MAX_TRANSACTIONS` limit.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```