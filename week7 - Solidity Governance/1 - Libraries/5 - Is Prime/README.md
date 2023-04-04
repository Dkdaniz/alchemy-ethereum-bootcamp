# Building on Functions

It's quite easy to invoke another defined function within the library itself:

```solidity
library UIntFunctions {
    function isEven(uint x) public pure returns(bool) {
        return x % 2 == 0;
    }
    function isOdd(uint x) public pure returns(bool) {
        return !isEven(x);
    } 
}
```

☝️ We're re-using the `UIntFunctions` library we made earlier. You can see we added an `isOdd` function that simply takes the result of `isEven` and flips it with the boolean NOT operator!

## 🏁 Your Goal: Is it Prime?

1. Create a function called `isPrime` that takes a `uint` parameter and returns a `bool` indicating if the number is a prime number.

> 🔍 A prime number is a number that is only evenly divisible by 1 and itself. Let's talk algorithm strategy in details.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

