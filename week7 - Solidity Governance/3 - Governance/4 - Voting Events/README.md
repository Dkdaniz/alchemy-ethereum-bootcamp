# Events

We'll want to make it easy for the user interface to subscribe to new proposal and voting events! 👨‍💻👩‍💻

Let's add some new events so we can listen closely. 👂

## 🏁 Your Goal: Proposal Created & Vote Cast Events

1. Create an event `ProposalCreated` which takes a single argument: a `uint` proposal ID. Emit this event whenever a new `Proposal` struct is created.
2. Create an event `VoteCast` which takes two arguments: a `uint` proposal ID and an address for the voter's `address`. Emit this event any time a new vote is cast.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

