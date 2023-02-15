# Storage Arrays

With arrays in storage you can use the `push` member function to add a new element at the end.

```solidity
import "hardhat/console.sol";
contract Contract {
	uint[] public numbers;

    constructor() {
		numbers.push(3);
		console.log(numbers.length); // 1
		numbers.push(4);
		console.log(numbers.length); // 2
		console.log(numbers[0]); // 3
		console.log(numbers[1]); // 4
    }
}
```

☝️ As you might expect the `length` member adjusts when new elements are pushed onto the end of the array.

## 🏁 Your Goal: Sum Dynamic Array

1. Create a public, dynamic sized array of unsigned integers as a state variable called `evenNumbers`.
2. Create an external function called `filterEven` which takes an dynamic size array of unsigned integers as its only argument. Find all of the even numbers in this array and push them into the `evenNumbers` storage array.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```