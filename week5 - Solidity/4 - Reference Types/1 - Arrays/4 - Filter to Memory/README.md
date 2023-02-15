# Memory Arrays

Unlike storage arrays, memory arrays **`do not`** have a push member function.

Memory arrays can have a dynamic size if the size is provided during initialization.

For example:

```solidity
import "hardhat/console.sol";
contract Contract {
	uint x = 5;

	function createArray() view external {
		address[] memory addresses = new address[](x);
		console.log( addresses.length ); // 5
	}
}
```

☝️ The size is dynamically provided by the variable `x`. We could potentially change this variable and it would create an array of addresses of that size. Notice the use of the `new` operator here during initialization!

**`After initialization`**, memory arrays **`cannot be resized`**. This means even in the example above, once the `addresses` array is initialized at size `5`, it will stay that length for the entirety of the transaction.

🔍 Let's take a look at an example where we filter any number over 5 in memory. You can find it on the details tab.

## 🏁 Your Goal: Filter Even Numbers

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