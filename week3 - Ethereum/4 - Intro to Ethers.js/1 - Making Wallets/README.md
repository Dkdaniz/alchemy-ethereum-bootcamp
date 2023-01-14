# Let's Make Wallets

First task is simple: create two wallets!

We're going to look at two different ways to instantiate a wallet: from a private key and from a mnemonic phrase.

## 🏁 Your Goal: Retrieve the Balance

In ethers.js you can create a [new wallet](https://docs.ethers.org/v5/api/signer/#Wallet-constructor) by invoking its constructor with a private key, or by using the `.fromMnemonic` method

Use this private key as a string to create the first wallet:

> "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d"

> ⚠️ **`Never use this private key to store anything on a mainnet!`** Once private keys have been shared publicly, they are no longer safe. In fact, there are machines watching activity on addresses with known private keys. If you send money to such an address, it will likely be gone in seconds!

2. Pass these words to create the second wallet:

> "plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice"

> ⚠️ **`Be just as cautious with mnemonic phrases as you would be with private keys.`** Don't share a mnemonic phrase that is storing funds on the mainnet, and certainly don't use the one above for storing anything of value!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
