# Inputs & Outputs

With a multitude of input and output UTXOs allowed in every transaction, there are many possibilities of exchange that exist!

Bitcoin wallet software will sometimes choose to include many input UTXOs just to aggregate them into one bigger UTXO to send back to the owner.

For instance, if you have five UTXOs, each with amounts of 0.1 BTC, your wallet may choose to combine them into 0.5 BTC on the next transaction. Behind the scenes magic 🐇🎩

The important part is ensuring there is enough total value in the input UTXOs to cover the total amount in the output UTXOs.

## 🏁 Your Goal: Ensure Sufficient Input

1. Let's make sure that the `inputUTXOs` have enough total value in them to cover the total value of the `outputUTXOs`.
2. If the total value of the inputs **`is less than`** the total value of the outputs, throw an error in the execute function.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```