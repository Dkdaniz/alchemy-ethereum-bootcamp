# Struct Arrays

We can create an array of struct types, just like we would with any other data type!

```solidity
// a dynamic size list of uints
uint[] numbers;

struct Account {
    uint id;
    uint balance;
}
// a dynamic size list of Accounts
Account[] accounts;
```

We can also push and retrieve accounts like any other storage array:

```solidity
accounts.push(Account(0, 100));

console.log(accounts[0].id); // 0
console.log(accounts[0].balance); // 100
```

☝️ Of course, `push` only works on `storage` arrays, as we learned in the lesson on arrays!

## 🏁 Your Goal: Vote Array

1. Create a public state array of the `Vote` data type called votes.
2. In the `createVote` function use the `choice` parameter and the `msg.sender` to create a new vote and push it onto the array of votes.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```