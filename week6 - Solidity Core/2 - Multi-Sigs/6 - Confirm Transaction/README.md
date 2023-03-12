# Owner Confirmations

Each owner should be able to signal their approval for the transaction by confirming it. Let's create a way for them to do this! 🚥✅

## 🏁 Your Goal: Confirm Transaction

1. Create a public `confirmTransaction` function with a transaction ID as its only argument. This function should create a confirmation for the transaction from the `msg.sender`.
   
## 🌅 View Function

2. Write a public, view function called `getConfirmationsCount` that takes a `uint` called `transactionId` and returns a `uint256` representing the number of times the transaction with the given `transactionId` has been confirmed.

>💡 Hint: The only addresses that can confirm are the **`owners`**. This would be a good place to start when trying to count the total number of confirmations.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
