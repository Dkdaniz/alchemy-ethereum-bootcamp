# Stack Club

This `StackClub` contract will have many members like a club or an organization would. We'll track these members by keeping a list of addresses.

Members will be added by pushing their address to the top of the list. Members will be removed by popping the most recent one off of the list. A Last-In-First-Out structure, just like a stack!

## 🏁 Your Goal: Add Members 👨👩

1. Create a dynamic sized array of addresses called members
2. Create an external function `addMember` which has a single parameter: an `address` for a new member.
3. Create a public view function `isMember` that takes an `address` and returns a `bool` indicating whether the `address` is a member or not.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```