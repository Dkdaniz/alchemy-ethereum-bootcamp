# Struct Arrays

We can create an array of struct types, just like we would with any other data type!

// a dynamic size list of uints
uint[] numbers;

struct Account {
    uint id;
    uint balance;
}
// a dynamic size list of Accounts
Account[] accounts;
We can also push and retrieve accounts like any other storage array:

accounts.push(Account(0, 100));

console.log(accounts[0].id); // 0
console.log(accounts[0].balance); // 100
☝️ Of course, push only works on storage arrays, as we learned in the lesson on arrays!

## 🏁 Your Goal: Remove Members

1. Create an external, view function called `createVote` which takes `Choices` value as a parameter and returns an instance of type `Vote`.
2. This function should use the `Choices` value and the `msg.sender` as the values to create the vote.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```