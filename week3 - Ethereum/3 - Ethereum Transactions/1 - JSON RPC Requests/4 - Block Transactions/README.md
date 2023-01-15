# Block Transactions

Ethereum blocks contain a list of transactions. This list can be empty or it can grow as large as the **`gas limit`** allows. The block **`gas limit`** can vary from block to block as we learned in the Gas on Ethereum section.

> 🧠 Remember a transaction has its own **`gas limit`** which is the amount of gas the owner is willing to spend on a transaction. The actual gas spent on a transaction can be lower than the limit and the sender will be issued a refund. This is quite different than the block's gas limit, so be careful not to get them confused!

Since a transfer costs 21000 gas, this means that ~714 transfer transactions could fit into a single block (assuming we hit the target gas limit of 15 million).

> 📖 The gas cost of a contract transaction depends heavily on its computational complexity. There is no upper limit to how much gas executing a contract function can take. After all, not knowing when the execution will halt is the reason gas was introduced in the first place!

## 🏁 Your Goal: Find Total Transactions

In the `getTotalTransactions` function, use the `blockNumber` to make a JSON-RPC request for the block. When you retrieved the block, find the total number of transactions inside the block and return it.

The `blockNumber` argument will match the block number on the blockchain.

Use the Ethereum API docs to help you find the right method!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
