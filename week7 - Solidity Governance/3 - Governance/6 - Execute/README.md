# Execute Vote

In smart contract governance systems there is usually some minimum voting participation that must be reached before a proposal can be executed. Most governance systems today use coin voting, where the number of voting ERC20 tokens you hold decide your vote weight.

## 🏁 Your Goal: Execute

Let's make our minimum voting threshold be 10 participants. Once 10 members have voted yes on a proposal, execute it.

1. Update the `castVote` function to execute the proposal when the 10 yes votes have been registered.
2. Execute the vote by sending the `data` to the `target` address via the `call` syntax.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

