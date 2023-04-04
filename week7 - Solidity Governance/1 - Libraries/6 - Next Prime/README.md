# Block Global

Among many global properties we can access inside Solidity is the block. The `block` will tell us information about the current `block` this transaction is being mined on:

- **`block.coinbase`** - The miner of this block's address ⛏️
- **`block.difficulty`** - The difficulty of the current block 😓
- **`block.gaslimt`** - The total gaslimit of the block ⛽
- **`block.number`** - The current block number 1️⃣
- **`block.timestamp`** - The current timestamp of the block (in seconds since unix epoch) 🕒

☝️ All of these are 256 bit unsigned integers with the exception of `coinbase` which is an address.

We can use these globals in contracts and libraries very simply:

```solidity
import "hardhat/console.sol";
contract MyExample {
    constructor() {
        console.log( block.timestamp ); // 1583271154
        console.log( block.number ); // 9600665
    }
}
```

## 🏁 Your Goal: Prime Block Winner

You'll find the `PrimeGame` contract in the new file `PrimeGame.sol.` This file has already imported the `Prime` library for you.

1. In this contract, create a function called `isWinner` that determines if the current block number is prime.
   
If it is prime, return `true`. A winner! 🎉
If not, return `false`. 😢

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

