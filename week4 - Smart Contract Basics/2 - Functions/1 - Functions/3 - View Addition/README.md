# Returning Values

It's time to learn how to return values from Solidity functions!

> 🔍 Returning values in Soldiity is only useful for internal functions and blockchain queries. See why in details.

Let's see an example:

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract Contract {
	bool _isRunning = true;

	function isRunning() external view returns(bool) {
		// return the state variable
		return _isRunning;
	}
}
```

☝️ The `isRunning()` function indicates it is returning a boolean data type within the function signature: `returns(bool)`. Once declared, we can use the return keyword to return a boolean value within this function.

> 💡 The `returns` declaration not only helps the compiler check for compile-time errors in our code, it also is how it generates the ABI. This helps external programs communicate with our Solidity contract! 👨‍💻👩‍💻

Adding the **`view`** keyword to the `isRunning` function signature guarantees it **`will not modify`** state variables. You can think of view functions as **`read-only`**; they can read the state of the contract but they cannot modify it.

## 🏁 Your Goal: Add Uint

Create an external view function `add` which takes a `uint` parameter and returns the sum of the parameter plus the state variable `x`.

> ⚠️ This function should not modify state. In fact, if it's labeled as a view it cannot modify state.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn mocha ./src/test.js
```