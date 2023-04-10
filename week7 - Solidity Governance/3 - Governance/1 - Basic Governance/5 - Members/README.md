# Voting Members

It's important for us to maintain a list of voting members.

After all, it's relatively easy for anyone to make hundreds of Ethereum addresses very quickly and vote with each of these addresses. The only thing stopping them is gas and effort! ⛽😓

> 👥 When a single person operates many accounts it is known as a **`Sybil`** attack. Any system that is setup to handle this is known to be **`sybil`** resistant.

## 🏁 Your Goal: Members

1. Create a public `constructor` which takes an array of `address`. These addresses, plus the deployer of the function, should all be allowed to create new proposals and vote on those proposals.
2. If anyone else attempts to create a proposal or vote, the transaction should be reverted. 🔒

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

