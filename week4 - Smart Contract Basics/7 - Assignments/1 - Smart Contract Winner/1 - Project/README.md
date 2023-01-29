# Mapping

Mappings allow you to store and retrieve elements quickly with a **`key`**. The key points to a location in memory where the **`value`** is stored.

The **`key`** can be any **`value data type`** in Solidity. It cannot be a reference data type like a struct or an array.

The **`value`**, on the other hand, can be any Solidity type. It can be a struct, an array or even another mapping!

Let's see an example of a mapping:

```solidity
import "hardhat/console.sol";
contract Contract {
    // create a score state variable 
    // maps an address (key) to a uint (value)
    mapping(address => uint) public score;

    function addPoint() external {
        // we're using msg.sender as the key 
        // to look up the score in memory
        console.log(score[msg.sender]); // 0

        // we can also update that location in memory
        score[msg.sender]++;
        console.log(score[msg.sender]); // 1
    }
}
```

☝️ The variable `score` takes an `address` and maps it to a `uint`. Each address will be mapped to its own unique `uint` value that it can retrieve and modify.

The `addPoint` function uses the `msg.sender` as the key to update a location in memory. This location in memory for a value is **`initialized at zero`**. We can add to it using the `msg.sender` as the key, as shown above.

> 💡 The `score` mapping is `public` which means that there will be a getter function created automatically. We can make a request to an Ethereum node invoking this getter function with an `address` and get a `uint` back.

## 🏁 Your Goal: Members Mapping

1. Create a public mapping called `members` which maps an `address` to a `bool`. The bool will indicate whether or not the `address` is currently a member!
2. Create an external function called `addMember` which takes an `address` and adds it as a member. You can do this by storing `true` in the data location corresponding to the address in the `members` mapping.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```