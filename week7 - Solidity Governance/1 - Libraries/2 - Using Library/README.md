# Using the Library

Now that we have a library with a useful function, it's time to use it! 😁

Libraries can be called directly, just as they were in the test cases of the last stage. However, they are more commonly imported into contracts.

> 🔍 How are libraries imported into contracts? Let's take a closer look at the technical details. 🤓

Let's use the library we built in the last stage in an `Example` contract!

There's two ways to do this. First:

```solidity
import "./UIntFunctions.sol";
contract Example {
    function isEven(uint x) public pure returns(bool) {
        return UIntFunctions.isEven(x);
    }
}
```

☝️ Here we can explicitly reference the `UIntFunctions` library and invoke its function `isEven`.

The other way to do this:

```solidity
import "./UIntFunctions.sol";
contract Example {
    using UIntFunctions for uint;
    function isEven(uint x) public pure returns(bool) {
        return x.isEven();
    }
}
```

☝️ In this example, we're applying the `UIntFunctions` library to the `uint` data type. This will add all the functions in the library to any `uint` in our contract. So flashy! 😎

## 🏁 Your Goal: Even Teams

We have a contract called `Game`, you can find it on the new `Game.sol` tab! 🕹️

This contract has two state parameters: `participants` and `allowTeams`.

1. Your goal is to create a constructor which takes a `uint` parameter for the number of participants in the game.
2. Store this `uint` in the `participants` state variable.
3. This game can be played free-for-all or team-against-team. To make sure the teams have the same number, ensure that the boolean `allowTeams` is only `true` if the number of participants is even.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

