# Multiple Arguments

It's possible to pass **`multiple arguments`** to an event just like a function:

```solidity
event ExampleEvent(
    uint _exampleArgument, 
    bool _exampleArgument2
);
```

> 🔍 It's not necessary to specify the names of the arguments. Let's take a look at why you might want to in details.

Then we can invoke it the same way we would with one argument:

```solidity
emit ExampleEvent(3, true);
```

## 🏁 Your Goal: Sum and Average

1. Create a new event called `Transfer` which has two `address` parameters: the original owner and the new owner.
2. Create an external function called `transfer` which takes a receipient `address` to send the collectible to. In this function, transfer the ownership of the collectible to the recipient.
3. Then, emit the `Transfer` event with the original owner's address and the new owner's address as arguments (be sure to specify the event arguments in that order).
4. Ensure that the person calling **`this function is the current owner`** of the collectible. Otherwise, revert the transaction.

> ✅ The owner of the collectible should be initially set as the deployer of the contract. You'll need to store this value into a state variable from the constructor so you can check for it in this function.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```