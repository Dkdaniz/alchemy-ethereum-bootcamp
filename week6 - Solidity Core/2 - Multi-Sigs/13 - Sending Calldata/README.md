# Storing ERC20 Tokens

So at this point, the question may occur to you: What if we wanted to store ERC20 tokens?

It turns out, it's quite simple to add this flexibility. All we need to do is add the ability to send calldata as part of our multisig execution.

> 💡 This functionality will actually allow us to run more complex logic than just transferring ERC20 tokens! The ERC20 standard simply serves as a good example here.

## 🏁 Your Goal: Send Calldata

1. Let's first start by adding a `bytes data` variable as the last member of our `Transaction` struct. This will store the calldata we will send to the destination!

## ⚠️ Compiler Complaints

2. After you have added `bytes data` to the struct, you'll get a few compiler complaints. To fix this, you'll need to accept a `bytes` argument in `submitTransaction`, as well as `addTransaction`.

>💡 You'll also need to pass this through the invocation to `addTransaction` within the `submitTransaction` function!

## ⚙️ Send the Data

3. Finally, we'll need to send the data inside the executeTransaction function. We can use this syntax:
   
```solidity
_tx.destination.call{ value: _tx.value }(_tx.data);
```
☝️ The `_tx` is the transaction we are executing. The properties `destination`, `value` and `data` could be named differently in your implementation. They are the properties stored in the `Transaction` struct for the address destination, uint value and bytecode data.

> 🔍 This call syntax will handle executing our transaction for sending data and ether! Check out details for a reminder on how this works.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
