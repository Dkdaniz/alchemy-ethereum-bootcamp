# Transaction Nonce

When sending transactions in Ethereum it's a requirement to include a nonce. The reasoning is quite simple: you wouldn't want your transaction to be executed **`multiple times!`** 😱

How could that happen? 🤔

Well, let's say you sign a transaction to send 1 ether to someone else. Once you sign this transaction and broadcast it to the network, everyone can see the data associated with the transaction.

Anyone could take your transaction and send it to miners again. The miners would see that it is your signature after all, so why shouldn't they execute it twice? The reason they won't execute it the second time is because of the account **`nonce`**!

The account nonce is simply a **`counter of all the transactions`** sent by an address. Every time you send a transaction from your account the counter goes up by 1. This makes each request unique, even if it has the same parameters! Each time you sign a transaction, you'll sign it with the latest transaction count as the nonce. If your or someone else tries to replay a transaction with a nonce lower than your transaction count, it will be rejected by the network.

## 🏁 Your Goal: Find the Nonce

Time to find the nonce for the account! It's up to you to find the correct method on this one. 🧐📖

Use the [Ethereum API documentation](https://docs.alchemy.com/reference/ethereum-api-endpoints) and your knowledge from the section above to find the appropriate method! 🧠

Once you retrieve the nonce, return it.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
