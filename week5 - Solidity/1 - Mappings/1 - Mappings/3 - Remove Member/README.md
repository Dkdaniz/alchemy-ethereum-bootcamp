# Mapping Removal

For arrays, removing elements can be an expensive operation, especially if you don't want to leave any gaps!

Let's say you had an array containing the unsigned integer values `[1,2,3]`. Removing the first element 1 would mean you would have to shift the values 2 and 3 down one position each. For a bigger array, this could mean many storage operations. Super expensive! 💰⛽

> 💡 In this case you could use a **`Linked List`** where you can "stitch" the previous node to the next node instead of having to shift elements.

For mappings, removal is quite simple. For example, in this students mapping:

```solidity
mapping(address => bool) students;

function removeStudent(address addr) external {
    students[addr] = false;
}
```

☝️ Simple code! We provide the address to find the memory location and set it to `false`.

## 🏁 Your Goal: Sum and Average

Create an external function called `removeMember` that will take an `address` and set its corresponding value in the `members` mapping to `false`.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```