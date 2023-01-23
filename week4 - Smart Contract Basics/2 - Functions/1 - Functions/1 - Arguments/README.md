# Solidity Arguments
The first function we'll talk about is the constructor:

```js
bool public isOpen;

constructor() {
    isOpen = true;
}
```

☝️ Here we are setting the value of a state variable upon the contract's deployment.

> 📖 The **`constructor`** for Solidity contracts is quite similar to the **`constructor`** in classes of many object-oriented languages. The constructor function is invoked **`only once`** during the contract's deployment and never again. It is generally used for setting up initial contract values.

What if we wanted to let the deployer of the contract decide the value of isOpen? 🤔

We can **`pass an argument`** to our constructor! Let's see that in action:

```js
bool public isOpen;

constructor(bool _isOpen) {
    isOpen = _isOpen;
}
```
☝️ Check it out! Now the contract deployer can decide the value of isOpen.

> 🔍 Notice how the parameter name (`_isOpen`) has an underscore in front of it? This prevents the variable from having the same name as the state variable. When the names collide it is referred to as variable shadowing. It can happen in Solidity quite often since we can refer to state variables without using `this`. Let's explore this further in details.

## 🏁 Your Goal: Unsigned Int Constructor

1. Create a constructor which will take a `uint` as an argument.
2. Store this `uint` value inside a public state variable called `x`.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
