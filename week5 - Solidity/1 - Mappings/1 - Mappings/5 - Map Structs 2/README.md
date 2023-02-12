# Types of Balances

Smart Contracts will often store balances for two different reasons:

1. **`Ether Balance`** - Keep track of the ether deposited by each user
2. **`Token Balance`** - Keep track of the amount of tokens held by each user

For ether, we use the native `value` on the message and the transaction. Sending `value` will update the user's account balance in the ethereum global state.

For tokens, we update a `balances` mapping. The smart contract is solely responsible for mantaining the user's balance.

In the smart contract you are building, you are mantaining your own balances in the `User` struct that has no relation to ether. To transfer balances from one user to another, you can just update the struct value! There is no need to send `value` over message call (i.e. using <address>.call).

## 🏁 Your Goal: Sum and Average

Let's create a new token where every new user will receive 100 tokens!

1. Create an external `function` called transfer which takes two parameters: an `address` for the recipient and a `uint` for the amount.
2. In this function, transfer the `amount` specified from the balance of the `msg.sender` to the balance of the recipient `address`.

## 🔒 Contract Security

1. Ensure that both addresses used in the `transfer` function have active users.
2. Ensure that the `msg.sender` has enough in their balance to make the transfer without going into a negative balance.
3. If either of these conditions aren't satisfied, revert the transaction.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```