# Choice Lookup

## 🏁 Your Goal: Find Vote

1. Create an external, view function `hasVoted` which takes an `address` and returns a `bool` indicating if the address has cast a vote or not.
2. Create an external, view function `findChoice` which takes an `address` and returns a `Choices` value indicating the choice on the vote cast by the address. For this function there is no need to worry about the case where a vote was not cast.

> 🔍 Interested in reducing your code? These functions can share a common function. It's a bit of a challenge, let's strategize in details.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```