# Lock it Down 🔒

There's only one address that should be able to call the approve method: the **`arbiter`**. 👩‍⚖️

This is their role in the escrow transaction, to decide when the funds can be transferred.

## 🏁 Your Goal: Security

If anyone tries to call `approve` other than the arbiter address, revert the transaction.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```