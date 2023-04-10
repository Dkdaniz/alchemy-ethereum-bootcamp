# Proposal Storage 📦

In this stage we're going to focus on the storage of new proposals.

A proposal should keep track of a question `"Should we elect Abraham as mayor?"`, the creator address, and the count of yes/no votes on the proposal.

## 🏁 Your Goal: Proposals
1. Create a public array of type `Proposal` and call it `proposals`.
2. Create an external function `newProposal` which takes two arguments:
   - An `address` argument which will be the target address of the proposal. We'll send some calldata to this address.
   - A `bytes` argument which will be the calldata to eventually send to the smart contract when the proposal is executed.
3. In the `newProposal` function create a new `Proposal` with the arguments passed in and the yes/no vote counts are initialized at `0`.
4. Add the new `Proposal` to the `proposals` array.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

