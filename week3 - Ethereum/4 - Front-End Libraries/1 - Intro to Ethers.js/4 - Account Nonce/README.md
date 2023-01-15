# Account Nonce

Time to expand on the code from the last stage. We made a `sendEther` function that will broadcast a transaction to the Ethereum network through our provider. Unfortunately this code doesn't work if we try to run multiple transactions. 😞

The test cases on this stage attempt to send multiple transactions. You'll see this issue if you try and run the tests now:

```
TXRejectedError: the tx doesn't have the correct nonce. account has nonce of: 1 tx has nonce of: 0
```

Remember our old friend, the account `nonce`? It keeps a running total of the number transactions sent from an account. The account nonce must be incremented after each successful transaction!

> 🔍 Check out details for a refresher on what could happen without a nonce to protect your transactions!

## 🏁 Your Goal: Fill in the Properties

We need to ensure the nonce is included in our transaction!

There's technically two ways to go about this. For one, we can use [provider.getTransactionCount](https://docs.ethers.org/v5/api/providers/provider/#Provider-getTransactionCount) to find the current transaction count and add a **`nonce`** parameter to our signed transaction.

**`OR`**...

We can use [wallet.sendTransaction](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction).

☝️ This method can **`sign the transaction`** and use the provider to **`fill in any missing properties`**. It's a one-stop shop! 🏪

_First_, we'll need to connect our wallet to our provider:

```js
// add the provider to our wallet as the second parameter
const wallet = new Wallet(PRIVATE_KEY, provider);
```

Now our wallet knows how to take care of business! We can use `wallet.sendTransaction` to replace **`both`** `wallet.signTransaction` and `provider.sendTransaction`.

Simply provide the transaction parameters directly to `wallet.sendTransaction` and return the resulting promise!

> 🔍 There's quite a bit `wallet.sendTransaction` does for us under the hood, let's take a look in details.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
