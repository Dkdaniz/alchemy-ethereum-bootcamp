# Transaction Struct

We've supplied the initial setup parameters to our Multi-Sig Wallet! The wallet will require the confirmation of multiple addresses to **`execute`** a transaction.

This means one owner will need to propose the transaction and the smart contract will need to store information about this transaction until the other owners can sign off on it! ✍️

## 🏁 Your Goal: Transactions

Define a Transaction struct that includes these member variables in **`the following order`**:

1. A address for the destination of the transaction's value.
2. A uint256 value of the transaction in wei.
3. A bool named executed* which indicates if the transaction has been executed.
   
> *Be sure to name this `executed` so the test cases can use this for a transaction status on later stages.

## 📦 Transaction Storage

We'll need to store the transactions while they are being confirmed by the other owners.

You have two options for your implementation here:

1. Create a public mapping from a `uint` id to a `Transaction`
   
**`OR`**

2. Create a public array of `Transaction`
   
Then, create a public `transactionCount` view function which returns the total number of transactions stored.

> 💡 This function can either be a getter for a public state variable or a function that returns the array length.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
