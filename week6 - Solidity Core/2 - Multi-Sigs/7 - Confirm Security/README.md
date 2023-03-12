# Only Owners

The multisig wallet would be pointless and insecure if anyone could confirm a signature. Let's make sure we handle this!

## 🏁 Your Goal: Confirmation Security

1. Ensure that `confirmTransaction` can only be called by the `owners` stored in the constructor. If anyone else calls this function, revert the transaction.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
