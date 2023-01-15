# Connect to Ethereum

In the previous stages, we created a wallet and used that wallet to sign a transaction.

Has the transaction been processed on Ethereum? … No? 🤔

Oh! **`We need to broadcast the transaction to the network`**! 💻➡️🌐

It's time to connect to Ethereum! For this, we'll use an ethers.js provider . In our case we'll be connecting to a local ganache instance for testing purposes. If you wanted to connect to the mainnet, you could simply configure the provider to point at our [Alchemy API key](https://alchemy.com/?a=dkdaniz).

## 🏁 Your Goal: Fill in the Properties

In order to broadcast a transaction to the network we'll need to create a provider, connect our wallet to that provider, and finally broadcast the rawTx through the provider. We can do this! 💪

1. **`Create the Provider`**
   To create the ethers.js provider, use the ganacheProvider passed in from `config`. The `ganacheProvider` is considered a Web3Provider by ethers.js. So we'll need to instatiate a new `Web3Provider`:

```js
const { providers } = require("ethers");

const provider = new providers.Web3Provider(ganacheProvider);
```

☝️ This will create a new ethers.js provider for us to connect to ganache.

> 📖 You can see all the different types of ethers.js providers here.

2. **`Broadcast the Transaction`**
   Finally, it's time to broadcast the transaction to Ethereum.

You can use [provider.sendTransaction](https://docs.ethers.org/v5/api/providers/provider/#Provider-sendTransaction) and pass it the rawTx.

Be sure to return the resulting promise of this function call!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
