# Dead Man's Switch 💀

A dead man's switch is a term used in many cases. The idea is pretty simple: if someone should become incapacitated, there is a way to detect it and act on it.

For our particular case we'll create a mechanism where the owner of a contract will need to **`ping`** or notify a contract every **`52 weeks`**. If there is no activity during this time period, the recipient will be able to withdraw the funds. The assumption here is that the owner is no longer able to do so.

> 📖 We use 52 weeks as opposed to a year since weeks are an available global time unit in solidity: `52 weeks` is valid code. Years are not globally available units due to leap years. Learn more [here](https://solidity.readthedocs.io/en/v0.6.2/units-and-global-variables.html#time-units).

## 🏁 Your Goal: Share Expenses

Create three functions on the Switch contract:

1. A public, **`payable`** `constructor` which takes a single argument: the `address` for the eventual recipient of the funds.
   
2. An external `withdraw` function which will transfer all of the contract funds to the recipient address.
   
3. An external `ping` function which restarts the period of inactivity.

## 🔒 Contract Security

Ensure that only the owner can call `ping`. No other address should be able to delay the switch's withdrawal execution. Revert the transaction if the caller is any other address.

Ensure that withdraw can only be called after 52 weeks of inactivity. If the owner has called `ping` or deployed the contract more recently than that, the withdrawal should be reverted.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
