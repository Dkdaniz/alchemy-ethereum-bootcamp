# Approve 👩‍⚖️

It's time to create the approve transaction! This will move the deposited funds to the beneficiary address.

We'll need the arbiter to sign this transaction in order for it to work!

## 🏁 Your Goal: Deploy

1. In the `approve.js` file, call the `approve` function on the Escrow `contract` using the arbiter signer.

> 💡 Hint : Remember: calling a contract from a specific signer can be done with: `contract.connect(signer).functionName()`

2. Return the transaction promise.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```