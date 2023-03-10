# Block Transactions

Ethereum blocks contain a list of transactions. This list can be empty or it can grow as large as the **`gas limit`** allows. The block gas limit can vary from block to block as we learned in the Gas on Ethereum section.

> 🧠 Remember a transaction has its own **`gas limit`** which is the amount of gas the owner is willing to spend on a transaction. The actual gas spent on a transaction can be lower than the limit and the sender will be issued a refund. This is quite different than the block's gas limit, so be careful not to get them confused!

Since a transfer costs 21000 gas, this means that ~714 transfer transactions could fit into a single block (assuming we hit the target gas limit of 15 million).

🤯 The gas cost of a contract transaction depends heavily on its computational complexity. Its possible that a contract function requires so much gas to execute that its impossible to fit into a block!

## 🏁 Your Goal: Find Total Transactions

1. In the getTotalTransactions function, find the total number of transactions included in the block specified by the blockNumber parameter and return this.

Use the [Ethereum API documentation](https://docs.alchemy.com/reference/ethereum-api-endpoints) to help you find the right JSON RPC method!

Note: The `blockNumber` argument will be passed in as a hexadecimal string (i.e "0xfe34").

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
