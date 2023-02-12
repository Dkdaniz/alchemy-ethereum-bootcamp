# Events 📣

When the Escrow is approved, the User Interface will want to show some indication.

Let's create an event so it is easy for the interface to subscribe to such an occurrence.

## 🏁 Your Goal: Security

1. Create an event called `Approved` which takes a single `uint` parameter: the balance that is sent to the beneficiary.
2. Emit this event from within the `approve` function.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```