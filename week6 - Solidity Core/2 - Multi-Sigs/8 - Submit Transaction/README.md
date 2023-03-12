# Submit Transactions

Let's create a new function that will allow a user to create a transaction and immediately confirm it.

> ⛽ We can pretty much assume that the owner submitting the transaction also wants to confirm it. We can save them some gas of creating another transaction by confirming it immediately!

## 🏁 Your Goal: Submit Transactions

1. Create an external `submitTransaction` function with a destination `address` and a uint value as it's arguments.
2. This function should create a new transaction and add it to storage and **`confirm it`**. Fortunately we already have two functions that do these things:
   
- The `addTransaction` function creates transactions and adds them to storage.
- The `confirmTransaction` function confirms transactions by their id.
  
☝️ Invoke both of these functions from within the `submitTransaction` function.

## 🔒 Change Visibility

3. Now that we have this more efficient function, change `addTransaction` function visibility from `public` to `internal`.

> ✅ Owners will only call submitTransaction so addTransaction should not be available from outside of the contract. It's generally a good security practice to keep as few functions public/external as possible. This way you have less endpoints you need to consider for vulnerabilities!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
