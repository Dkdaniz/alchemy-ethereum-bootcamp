# Taking Calldata

If we take calldata as an argument to a function we can pass that arbitrary calldata along to another contract. This can allow the message sender to decide which function to call and with what arguments.

This can be super useful, especially in contracts that require many people to pass their approval before a transaction is executed. We'll talk about decentralized organizations and multiple-signature wallets later on in the course and you'll see that storing calldata for later use is critical for maximum flexibility in these cases.


## 🏁 Your Goal: Pass Calldata

The Sidekick needs to be able to `relay` any calldata along to the Hero. Update the `relay` function to take the `data` and send it to the `Hero` as calldata.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```