# Libraries 📚

Libraries are quite similar to contracts! They are defined with the same syntax: `contract C {}` and `library C {}`. They both contain functions with all the same properties, types and syntax. They have access to the same global variables and opcodes.

So what are the differences? 🤔

One **`major difference`** between libraries and contracts is that libraries do **`not have state`**. Trying to declare a state variable on a library will not compile.

> 📖 Libraries also cannot receive ether, inherit (or be inherited from), or be destroyed. These are functions of contracts we will cover later in the curriculum.

The purpose of libraries is to **`share code`**.

Ideally libraries contain functions with **`basic reusable algorithms`**. This will help developers stop themselves from re-inventing the wheel! 🎡

Good libraries are rigorously tested and audited. Using such a library is a benefit to your contract as less new code reduces your chances for bugs! 🐛

> 🔒 OpenZeppelin provides many great [Solidity libraries](https://github.com/OpenZeppelin/openzeppelin-contracts) that have been audited by leading security firms in the field.

## 🏁 Your Goal: Library Function 📚🚀

1. Create a public pure function called `isEven`.

> 🔍 This must be a **`pure`** or **`view`** function. Let's explore this further in details.

2. This function should take a `uint` as a parameter and return a `bool` indicating if the integer is even.

> 💡 Recall that the modulo operator is available in Solidity! It returns the remainder after division so 3 % 2 will evaluate to 1 while 4 % 2 will evaluate to 0.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

