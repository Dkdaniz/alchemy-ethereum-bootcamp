# Inheritance

Traditionally, inheritance is when one class **`copies`** (or inherits) functionality from another class.

> 📖 Throughout this lesson you'll see the terms **`base`** and **`derived`**. Simply put, the **`derived`** class inherits from the **`base`** class.

For Solidity, we'll be talking about inheritance for Contracts instead of Classes. However, the concept is the same!

It's quite easy to inherit contracts in Solidity. Let's see an example:

```solidity
contract Base {
	uint public value = 10;

	function changeValue(uint _value) external {
		value = _value;
	}
}

contract Derived is Base {
    // inherits everything from base contract!
}
```
☝️ In this example the `Derived` inherits both the `value` state variable as well as the `changeValue` function!

To setup the inheritance, all we need is the `is` keyword in the contract declaration, which specifies which contract to inherit from.

> 📖 The body of the `changeValue` function is actually copied into the `Derived` functions bytecode, when inherited. Then we can deploy `Derived` as a standalone contract with all of its inherited functionality baked in.

## 🏁 Your Goal: Make SuperHeroes

You'll notice that the `SuperHeroes.sol` file imports the `Hero.sol` read-only file. Your goal is to create two new contracts that inherit from the base `Hero` contract.

1. Create two new contracts `Mage` and `Warrior` which inherit both the function and the state variable from the `Hero` contract.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
