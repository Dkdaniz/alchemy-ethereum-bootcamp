# Structs in Calldata & Memory

Traditionally structs were not handled by the ABI. More recently, the `ABIEncoderV2` has been added which will allow us to pass structs as calldata and return them in external functions! 🎉

To use the `ABIEncoderV2` we need to use a new pragma statement:

```solidity
pragma experimental ABIEncoderV2;
```

☝️ With this pragma statement at the top of our code, we can use **`tuples`** in our ABI to describe structs.

> 📖 Recall that tuples are temporary groupings of potentially dissimilar data types used for destructuring and returning multiple function parameters.

> ⚠️ Despite the **`experimental`** keyword, the ABIEncoverV2 is no longer considered experimental by the Solidity team as of **`Solidity v0.6.0`**. In other words, it is now considered safe for production use.

This encoder will allow us to take struct arguments and return structs externally:

```solidity
struct Hero { uint health }

function postHero(Hero hero) external {
    // take a Hero type as an external argument
    console.log(hero.health); // 100
}

function getHero() external view returns (Hero memory) {
    // return Hero in an external function
    return Hero(100);
}
```

> 🔍 Let's see what the ABI for a struct would look like on the Details Tab.

## 🏁 Your Goal: Remove Members

1. Create an external, view function called `createVote` which takes `Choices` value as a parameter and returns an instance of type `Vote`.
2. This function should use the `Choices` value and the `msg.sender` as the values to create the vote.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```