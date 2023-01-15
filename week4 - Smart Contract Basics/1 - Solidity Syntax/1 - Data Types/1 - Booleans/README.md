# State Variables

Let's get started by writing some **`state variables`**! **`State Variables`** are stored in the contract's persistent memory. Modifying a state variable in one transaction will change its value for anyone who tries to read the variable afterwards.

In Solidity, declaring a state variable is as simple as declaring the variable inside of the contract:

```solidity
contract Contract {
	bool myVariable;
}
```

The `Contract` now has a boolean state variable called `myVariable`! Sweet. 😁

> 💭 What is the value of `myVariable` at this point? Data Types in Solidity have default values, for booleans it is `false`. So, after deploying this contract, `myVariable` would be `false`.

Now we're going to do two things to our variable: **`make it public`** and **`give it an initial value `**of `true`:

```solidity
contract Contract {
    bool public myVariable = true;
}
```

☝️ See how we added the keyword public here? This automatically creates a **`getter`** function for the variable.

Now we can access the value in `myVariable` by calling a function on the contract with that very name: `myVariable()`.

## 🏁 Your Goal: Add two boolean variables

Create two public boolean state variables on the contract: `a` and `b`.

Store true in the variable a and false in the value b.

> 🔍 You'll see the **`checkmarks`** appear on your ABI Validations tab when you have successfully made two public variables `a` and `b`. Learn more about ABI Validations in details.

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
