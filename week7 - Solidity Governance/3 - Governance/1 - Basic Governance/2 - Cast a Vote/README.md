# Voting 🗳️

Now that we have proposals with vote counts, it's time to create voting functionality!

## 🏁 Your Goal: Cast Vote

1. Create an external function `castVote` which takes a `uint` proposalId and a `bool` which indicates whether the vote supports the proposal (`true` for yes, `false` for no).
2. For each vote cast, update the `yesCount` and `noCount` in the referenced proposal accordingly.

> 💡 Don't worry about double votes for the moment, we'll get to that in the next stage!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

