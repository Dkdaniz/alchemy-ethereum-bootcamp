# Token Balances

It's essential for users to be able to see how many tokens they have in our **`Token`** contract, so that they know how much they can spend. At the moment, there isn't a way for users to see how many tokens they have.

## 🏁 Your Goal: Balances

Create three public state variables:

1. Create a mapping which maps an `address` to a `uint256` value. This will give each address its own balance.
2. Create an external, view function `balanceOf` which takes an address and returns the uint balance corresponding to the address in the mapping.

> 💡 Most ERC20 tokens follow the ether standard of having 18 decimals.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
