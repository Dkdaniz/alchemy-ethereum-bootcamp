# Execution

It's time to execute our multi-sig transaction!

This is the part of the process where we have reached the required amount of signatures, so we can go ahead and move the funds! 💸

## 🏁 Your Goal: Execute Transaction

1. Define a public `executeTransaction` function with a `uint` transaction ID as it's only argument.
   
2. Ensure that the `executeTransaction` function sends the transaction value to the `address` specified within the transaction object. Check out the details tab for a reminder on using the `call` syntax.
   
3. Once transferred, set the transaction's `executed` boolean to `true`. This way we'll know the transaction has been completed.

## 🔒 Only Confirmed

4. The transaction should only execute if it is confirmed. If not, revert the transaction.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
