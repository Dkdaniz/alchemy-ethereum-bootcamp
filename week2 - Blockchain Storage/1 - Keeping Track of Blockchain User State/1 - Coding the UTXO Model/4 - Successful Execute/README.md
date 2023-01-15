# Successful Transaction

When a transaction is successful and mined to the blockchain, the **`output UTXOs`** become new TXOs that are ready to be spent. The **`input UTXOs`** need to be **`marked as spent`**, to ensure that they are not spent again!

After all, the whole purpose of the blockchain is to fix the double-spend problem 😉

## 🏁 Your Goal: Mark Inputs as Spent

If no errors are thrown during the execute function of the transaction, then it is successful! 🎉

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```