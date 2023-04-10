# Multiple Votes

We need to handle the case where an address **`votes twice`**. ✌️

One potential way to handle this is to prevent voters from voting twice. However, what if they want to change their vote? 🤔

Let's allow voters to change their vote. Adding this functionality will require that we account for the vote change in the vote counts. This means that if the address previously voted yes and switched to no, we'll want to decrement the yesCount and increment the noCount. And vice-versa!

## 🏁 Your Goal: Vote Changing

1. Modify the `castVote` function to allow voters to change their vote on a particular proposal.

>💡 The implementation of this is up to you! You'll need to figure out a new way to track which **`addresses`** have already voted on which proposal.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

