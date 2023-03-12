# RSVP

## 🏁 Your Goal: Start a Party!

This challenge is all about creating a group with your friends to split a shared expense.

## 🏗️ Setup

1. The first thing you'll need to do is create a constructor function on the `Party` contract which will set the deposit amount it will cost someone to RSVP to the party. This constructor function will take in a `uint256` amount. Store this for later. It must be paid by the participants, or they cannot join the party!

## 💸 RSVP

2. Create a external, payable function called `rsvp` that will allow your friends to join the party. This function should keep track of the addresses joining the party so we can split the expenses in the next stage. These will be the addresses calling the function.

## 🔒 Security

3. Ensure that anyone who RSVPs to the party sends the **`exactly`** the required deposit. If they do not send exactly this amount, revert the transaction.
   
4. Ensure that an address that has RSVP'd already cannot RSVP again! If the same address tries to RSVP twice, revert the transaction.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
