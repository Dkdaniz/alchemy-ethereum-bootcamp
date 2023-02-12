# Mapping Retrieval

Compared to arrays retrieving a value from a mapping is quite simple!

Consider:

```solidity
mapping(address => bool) students;

function isStudent(address addr) external view returns(bool) {
    return students[addr];
}
```
Versus:

```solidity
address[] students;

function isStudent(address addr) external view returns(bool) {
    for(uint i = 0; i < students.length; i++) {
        if(students[i] === addr) {
            return true;
        }
    }
    return false;
}
```

☝️ To find if the student address is an array we have to iterate over the array. For the mapping we can simply plug in the address.

> ⛽ Choosing the right data structure is half the battle. It can help keep the code clean and use less gas!

> 🔍 Curious how the value lookup for the mapping works under the hood? Let's take a look in details.

## 🏁 Your Goal: Sum and Average

Create an external, view function called `isMember` which takes an `address` and returns a bool indicating whether or not the address is a member.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```