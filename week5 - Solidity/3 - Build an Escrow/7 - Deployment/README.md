# Deploy Escrow

It's time to take the Escrow contract we've created and deploy it using ethers.js!

Given an abi, bytecode and a signer we can deploy a contract:

```js
const factory = new ethers.ContractFactory(abi, bytecode, signer);
const promise = factory.deploy(/* constructor arguments */);
```

☝️ The `ContractFactory` holds the information we need to interact with the contract. We can deploy multiple contracts with this factory.

The `deploy` method will sign a transaction with the contract's bytecode and broadcast the transaction through the provider. Since this is asynchronous, naturally, it returns a promise.

The constructor arguments to the `deploy` function are passed in like arguments to any other ethers.js function. This also includes the [overrides](https://docs.ethers.org/v5/api/contract/contract-factory/#ContractFactory-deploy) object which can contain additional properties like **`value`**, **`gasLimit`**, **`nonce`**, etc...

## 🏁 Your Goal: Deploy

1. In `deploy.js` complete the deploy function! This function is provided with the `abi`, `bytecode` and `signer` which are needed to create a `ContractFactory` instance.
2. Create the factory and then call `factory.deploy` with the address arguments as they should be supplied to the Escrow constructor function.

> 📖 See here for the ethers.js [Contact Documentation](https://docs.ethers.org/v5/api/contract/contract/).

3. Additionally, send a 1 Ether deposit to the contract. Hint: you'll want to specify `value` in your deploy function
4. Return the deployment promise.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```