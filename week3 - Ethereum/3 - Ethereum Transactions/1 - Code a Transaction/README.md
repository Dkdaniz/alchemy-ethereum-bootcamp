# Send a Signed JSON-RPC Request on Göerli using the Alchemy SDK

We can produce a Signed JSON-RPC Request right now. You'll need to have [Node.js](https://nodejs.org/en/download/installed! Let's pull up a local development project real quick...

# Activity: Send a Signed JSON-RPC Request on Göerli using the Alchemy SDK

## Set up local project & `dotenv` variables

1. Open a terminal on your computer
2. Type `cd Desktop`, then `mkdir sign-tx && cd sign-tx`
3. Once you are in the `sign-tx` directory, `run npm init -y` to initialize an empty `package.json` file
4. Run `npm install alchemy-sdk`
5. Run `npm install dotenv`
6. Run `touch .env` at the root-level directory of your project
7. Open the `.env` file and copy-paste the following:

```
TEST_PRIVATE_KEY=YOUR_TESTNET_ACCOUNT_PRIVATE_KEY
TEST_API_KEY=YOUR_ALCHEMY_API_KEY
```

## Add the script and run it

1. Add in your private key and Alchemy account API key, then save-and-close the file
2. Run touch index.js
3. Copy-paste the following into the index.js file:

> 💰To send a transaction we'll need some test Eth in our wallet. You can get fake Goerli ETH by visiting : https://goerlifaucet.com/

```js
const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
require('dotenv').config();

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const settings = {
  apiKey: TEST_API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(TEST_PRIVATE_KEY);

async function main() {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    'latest'
  );

  let transaction = {
    to: //choose any address!,
    value: Utils.parseEther('0.001'), // 0.001 worth of ETH being sent
    gasLimit: '21000',
    maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
    maxFeePerGas: Utils.parseUnits('20', 'gwei'),
    nonce: nonce,
    type: 2,
    chainId: 5, // göerli transaction
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  console.log('Raw tx: ', rawTransaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`);
}

main();
```

4. Update the commented out portions of the transaction (ie. recipient, amount, etc)

- Source an address to send some ETH to in this [AU Discord channel](https://discord.com/login?redirect_to=%2Fchannels%2F1039895401832128532%2F1050240006574317618!

5. Save everything
6. In your terminal, at the root-level directory, run node index.js

You should now see your terminal show the direct link to your transaction being indexed on [Goerli Etherscan](https://goerli.etherscan.io/)!

If you see your transaction processing on Etherscan, you have literally just sent a signed transaction to the Ethereum testnet... from a script in your local... after running a command in your terminal - BOOM!!!! 💥
