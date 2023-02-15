# Pop

Storage arrays also have access the pop member variable:

```solidity
import "hardhat/console.sol";
contract Contract {
	uint[] public numbers;

    constructor() {
		numbers.push(3);
		numbers.push(4);
		console.log(numbers.length); // 2
		numbers.pop();
		console.log(numbers.length); // 1
        console.log(numbers[0]); // 3
    }
}
```

☝️ As you can see, `pop` will take the top element off the storage array.

## 🏁 Your Goal: Remove Members

1. Create a constructor which will add the deployer address as the first member of the stack club.
2. Create a `removeLastMember` function which will remove the last member added to the club.

## 🔒 Function Security

1. Ensure that the `removeLastMember` function can only be called by an existing member
2. Ensure that `addMember` can only be called by an existing member

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```