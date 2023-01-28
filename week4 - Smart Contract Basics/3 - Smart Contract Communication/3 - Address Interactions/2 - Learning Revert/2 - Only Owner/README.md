# Restricting by Address

We can provide certain roles to an address.

For instance, let's say we had an address that could create new game items:

```solidity
error NotItemCreator();

contract Game {
    address itemCreator = 0xc783df8a850f42e7f7e57013759c285caa701eb6;

    function createItem() public {
        if(msg.sender != itemCreator) {
            revert NotItemCreator();
        }
        // TODO: create the item!
    }
}
```

☝️ This function `createItem` may be `public`, but there's only one address that can call it without the transaction reverting!

## 🏁 Your Goal: Owner Withdrawal

1. Create a public function `withdraw` that will withdraw all funds from the contract and send them to the deployer of the contract.
2. Require that only the deployer of the contract be allowed to call this function. For all other addresses, this function should revert.
   
> 💡 The deployer of the contract is `msg.sender` of the constructor.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```