# Constructor Storage 🏗️

Each time that a **`depositor`**, **`arbiter`** and **`beneficiary`** come to an agreement upon Escrow terms, they can deploy a contract.

The depositor will be the **`signer`** deploying the contract. They will ask the arbiter and beneficiary for addresses that those two parties have access to. Then the depositor will provide those addresses as the arguments to the Escrow contract for storage.


## 🏁 Your Goal: Store Addresses

1. Create a `constructor` which takes two arguments: an address for the arbiter and an `address` for the beneficiary (in that order). Store these variables in the corresponding state variables.

2. The depositor is the address deploying the contract, so take this address and store it in the `depositor` state variable

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```