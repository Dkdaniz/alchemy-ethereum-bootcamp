# Approval

After the contract has been deployed with the appropriate amount of funds, the beneficiary will provide the good or service. They are now secure in knowing that the money is on its way! 👨‍🔧👍

Once the good or service is provided, the arbiter needs a way to **`approve`** the transfer of the deposit over to the beneficiary's account. 👩‍⚖️🆗

Let's add this mechanism to our contract!

## 🏁 Your Goal: Approve

1. Create an external function called approve.
2. This function should move the contract's balance to the beneficiary's address.
3. Create a boolean public state variable called isApproved which is initially set to false, then changed to true after the contract has been approved.
   
Remember [the proper syntax for using .call()](https://solidity-by-example.org/sending-ether/) to send ether:

```solidity
(bool sent, ) = _to.call{ value: someValue }("");
require(sent, "Failed to send ether");
```

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```