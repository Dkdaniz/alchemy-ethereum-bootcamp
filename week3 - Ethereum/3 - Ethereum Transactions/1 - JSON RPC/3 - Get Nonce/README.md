# Transaction Nonce

When sending transactions in Ethereum it's a requirement to include a nonce. The reasoning is quite simple: you don't want your transaction to be sent **`twice`** (or more than that)! 😱

How could that happen? 🤔

Well, let's say you sign a transaction to send 1 ether to someone else. Once you sign this transaction and broadcast it to the network, everyone can see the data associated with the transaction.

Anyone could take your transaction and send it to miners. The miners would see that it is your signature afterall, so why shouldn't they run it? They won't run it twice because of the account **`nonce`**!

The account nonce is simply a **`counter of all the transactions`** sent by an address. Every time you send a transaction from your account the counter goes up by 1. Each time you sign a transaction, you'll sign it with the latest transaction count as the nonce. If someone tries to replay a transaction with a nonce lower than your transaction count, it will be rejected by the network.

## 🏁 Your Goal: Find the Nonce

Time to find the nonce for the account! It's up to you to find the correct method on this one. 🧐📖

Use the [Ethereum API documentation](https://docs.alchemy.com/reference/ethereum-api-quickstart) and your knowledge from the section above to find the appropriate method! 🧠

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
