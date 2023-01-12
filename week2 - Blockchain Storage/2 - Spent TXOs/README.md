# Transactions

Transactions on the Bitcoin network can have **`many inputs`** and **`many outputs`**.

> 🧐 You can take a look at this [Bitcoin Transaction](https://www.blockchain.com/btc/tx/1c55e5e7446ce296fd78132b8196fb82190af050585867a04f9182c53dc480af) for an example of one with many outputs.

This combined with a [cripting system](https://en.bitcoin.it/wiki/Script) on each transaction allows Bitcoin users to engage in more complex financial agreements than one individual simply sending money to the other.

For your average transaction, the Script simply requires that new UTXOs can only be spent by the associated address.

## 🏁 Your Goal: Ensure Inputs are UTXOs

On this stage, we introduce a new file `Transaction.js`.

In the `Transaction` constructor you'll see two arguments passed in: `inputUTXOs` and `outputUTXOs`. Both of these objects are arrays containing instances of transaction outputs.

1. Store `inputUTXOs` and `outputUTXOs` on the transaction object.
2. In the `execute` function do one thing for now: ensure that none of the `inputUTXOs` are already spent. We can't allow double-spending TXOs!
3. Throw an error in `execute` if any input TXO is already spent.

> ❓ The terminology between UTXO and TXO can sometimes get confusing. Remember that a TXO is just the nomenclature for a UTXO that is` already spent`!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```