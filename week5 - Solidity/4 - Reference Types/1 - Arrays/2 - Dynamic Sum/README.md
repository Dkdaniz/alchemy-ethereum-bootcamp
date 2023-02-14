# Dynamically Sized Arrays

We can also create arrays in Solidity where the size is unknown at compile-time. These arrays are said to have dynamic size.

For example:

```solidity
import "hardhat/console.sol";
contract Contract {
    function logFriends(address[] calldata friends) external view {
        for(uint i = 0; i < friends.length; i++) {
            console.log(friends[i]);
        }
    }
}
```

☝️ Here we are able to log each address that is sent to the `logFriends` function.

We use the `length` member available on the array to determine the number of elements inside the dynamic sized array and then we use number indexes to retrieve the address.
```

## 🏁 Your Goal: Sum Dynamic Array

1. Create a pure, external function `sum` which takes a dynamic size array of unsigned integers.
2. Find the sum of the unsigned integers and return it as a `uint`.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```