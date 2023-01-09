# The Mempool
Users who want to make transactions will broadcast their transactions to the blockchain network. The mempool is a place for miners to keep those transactions before adding them to a block.

Typically, the miner will take all the transactions with the highest transaction fees from the mempool. Then they'll add them to the block and attempt to find the proof of work.

>📖 You can find more information on bitcoin miner fee priority [here](https://en.bitcoin.it/wiki/Miner_fees#Priority_transactions).

## 🏁 Your Goal: Add Transaction

Let's get the ethereum address from the public key!

Your goal is to implement the `addTransaction` function, which adds transactions to the mempool.

Take the `transaction` sent to the function and push it on top of the `mempool` array.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```