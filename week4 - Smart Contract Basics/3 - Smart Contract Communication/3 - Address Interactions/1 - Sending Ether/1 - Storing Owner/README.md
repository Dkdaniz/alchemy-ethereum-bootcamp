# Solidity Addresses

Let's talk about the `address` data type in Solidity!

From our Ethereum lessons we know that an address on the EVM is a 160 bits long, or a 40 character, hexadecimal string:

> address a = 0xc783df8a850f42e7f7e57013759c285caa701eb6;
> 
☝️ This is valid Solidity! We can store a fixed address in our contracts if we need to.

We can also find the sender of the current message:

```solidity
import "hardhat/console.sol";
contract Example {
    constructor() {
        console.log( msg.sender ); // 0xc783df8a850f42e7f7e57013759c285caa701eb6
    }
}
```
☝️ Here we are logging the address of the account calling this contract.

> 🔍 What is msg? We'll take a closer look at Ethereum Messages in Details.

## 🏁 Your Goal: Store the Owner
1. Create a public address state variable called owner on the contract
2. Next create a constructor function which will store the msg.sender in owner
3. 
> 📖 Since the constructor is only called **`once during contract deployment`**, storing the owner is not all too uncommon, especially if you need to have an administrative role. Of course, keep in mind that the administrative role can infringe on the decentralized nature of your contract!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```