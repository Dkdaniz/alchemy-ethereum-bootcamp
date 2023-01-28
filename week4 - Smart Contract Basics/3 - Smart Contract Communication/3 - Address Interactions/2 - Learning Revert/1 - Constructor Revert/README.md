# Reverting Transactions

In the EVM the main opcode to revert a transaction is `REVERT`. There are three ways to invoke the `REVERT` opcode from Solidity are `assert`, `require` and `revert`, but let's ignore `assert` for now (see this stage's details section for more on `assert`).

We can revert a transaction in Solidity by using the `require` function and the `revert` statement.

A `require` statement has two forms:

```js
require(someBooleanCondition);
```

and

```js
require(someBooleanCondition, "Optional error message");
```

☝️ These will revert if `someBooleanCondition` is false. We can use these to check for all kinds of conditions.

A `revert` provides the same access to the `REVERT` opcode without a condition.

```js
if(!someBooleanCondition) {
    revert SomeCustomError(errorArg1, errorArg2, ...);
}
```

Note that as of Solidity `^0.8.0`, `revert` is a statement and **`NOT`** a function. However, for backward compatability reasons, revert can still be used in function form. So `revert` can also be used like:

```js
if(!someBooleanCondition) {
    revert("Some error message");
}
```

☝️ In both of the `revert` usages above, we check the boolean condition ourselves. If the condition is unexpected, we can call `revert` with a custom error or a string describing the reason for the error.

## 🏁 Your Goal: Require 1 Ether Deposit

Add a payable constructor method that requires a 1 ether deposit.

If at least 1 ether is not sent to the constructor, revert the transaction.

> 📖 There are globally available `ether` units such as ether that you can use instead of having to convert from Wei `(1 ether == 1e18)`. See [Ether Units](https://docs.soliditylang.org/en/v0.8.4/units-and-global-variables.html#ether-units).

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```