# Base Utility Contracts

It is often quite useful for a base contract to provide utility functions and modifiers.

Let's see an example:

```solidity
contract Depositable {
    modifier requiresDeposit {
        require(msg.value >= 1 ether);
        _;
    }
}

contract Escrow is Depositable {
    address owner;
    constructor() requiresDeposit {
        owner = msg.sender;
    }
}
```

☝️ Here the `Escrow` contract requires a deposit of at least 1 ether in order to deploy. Otherwise the transaction will revert.

This requirement comes from the base contract `Depositable` and is used through the inherited `requiresDeposit` modifier.

## 🏁 Your Goal: Only Owner

On the Collectible.sol tab you'll see that Collectible contract inherits from the Ownable contract.

1. Your goal is to fill out the Ownable base contract, which will be used by the Collectible contract!
2. The owner should be defined in the Ownable base contract
3. Ensure that markPrice can only be called by the owner (the deployer of the collectible)

> 💡 HINT: The markPrice function uses an onlyOwner modifier which is currently not implemented anywhere!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
