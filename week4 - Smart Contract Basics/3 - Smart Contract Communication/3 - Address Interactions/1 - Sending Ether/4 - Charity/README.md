# Contract Account

Within contracts, the `this` keyword can explicitly converted to an address:

```solidity
import "hardhat/console.sol";
contract Contract {
	constructor() {
		console.log( address(this) ); // 0x7c2c195cd6d34b8f845992d380aadb2730bb9c6f
		console.log( address(this).balance ); // 0
	}
}
```

☝️ Using this we can easily find the address and balance of the contract!

> 🔍 Let's take a closer look at the Solidity keyword this in Details.

## 🏁 Your Goal: Charity Donation

Let's take all funds that were passed to the receive function and donate them to charity. We'll do this in **`two steps`**.

1. **`First`**, modify the constructor to accept a new argument: the charity address.
2. **`Next`**, add a new function called donate. When this function is called transfer all remaining funds in the contract to the charity address.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```