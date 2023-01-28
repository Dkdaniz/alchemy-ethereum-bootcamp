# Interfaces

The simplest way to program a contract to communicate with another contract is by defining the contract you're interacting with. Interfaces provide this functionality for us, so for example:

```solidity
interface IToken {
    function getBalance(address user) external;
}
```

☝️ We can use this interface to properly communicate with a token contract that implements the `getBalance` method:

```solidity
// tokenAddress: a contract adddress we want to communicate with
// userAddress: the address we want to lookup the balance for
uint balance = IToken(tokenAddress).getBalance(userAddress);
```
Behind the scenes Solidity is creating a message call that follows the calldata format described in the introduction.

## 🏁 Your Goal: Alert Hero

Use the `IHero` interface and the `hero` address passed into `sendAlert` to alert the hero from the Sidekick contract

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```