# State Variables

We'll have three parties involved in the Escrow:

1. 🙂 **`Depositor`** - The payer of the Escrow, makes the initial deposit that will eventually go to the beneficiary.
2. 👨‍🔧 **`Beneficiary`** - The receiver of the funds. They will provide some service or good to the depositor before the funds are transferred by the arbiter.
3. 👩‍⚖️ **`Arbiter`** - The approver of the transaction. They alone can move the funds when the goods/services have been provided.
For this first stage, let's create these addresses as public state variables!

## 🏁 Your Goal: Addresses

Create three public state variables for the addresses of the `depositor`, `beneficiary` and `arbiter`.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```