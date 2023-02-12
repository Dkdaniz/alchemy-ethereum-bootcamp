# Emitting an Event

To emit an event, we need to take two steps. First, we need to declare the event:

```solidity
event ExampleEvent(uint _exampleArgument);
```

☝️ The `event` keyword prefaces the event declaration, otherwise, it's quite similar to function syntax without the additional keywords and function body.

> ✅ Functions and Events use a different naming convention. Events are typically **`UpperCamelCase`** whereas function names are **`lowerCamelCase`**. This is a style-choice, so the compiler will not enforce this rule. However, it's generally best to stick to convention.

Then we must emit the event from inside of a function body:

```solidity
function exampleFunction() external {
    emit ExampleEvent(5);
}
```
☝️ We use the keyword `emit` prior to invoking the event. Then we can pass it the argument just like we would for a function.

> 🔍 Curious to see how we can look up events after the transaction? Let's take a look in details.

## 🏁 Your Goal: Deployed Event

1. Create a new `event` called `Deployed`. This event should take one argument: an `address`.
2. This address will be the first **`owner`** of this collectible. The owner in this case will be the address that deployed the contract.
3. Create a public `constructor`. In this constructor, emit the `Deployed` event with the owner's address as the argument.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```