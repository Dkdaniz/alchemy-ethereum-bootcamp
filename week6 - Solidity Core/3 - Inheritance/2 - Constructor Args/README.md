# Constructor Inheritance

In the previous example, the `Base` contract had a state variable with an initial value and a function to modify it.

What if the `Base` contract had an initial value that was set in a constructor?

```solidity
contract Base {
	uint public value;

    constructor(uint _value) {
        value = _value;
    }
}
```

☝️ Can we pass that initial value into the `Base` constructor when we're inheriting it? 🤔

Sure can! 💪

Same syntax as invoking a function:

```solidity
contract Derived is Base(10) {
    // inherits everything from base contract!
}
```

☝️ See how we passed `10` into the `Base` contract? This is provided as a constructor argument!

> 📖 It is possible to send multiple arguments to the constructor as well. This is also function syntax, comma-separated arguments within the parenthesis.

## 🏁 Your Goal: Specific Health 🌡️

You'll notice that the `Hero.sol` file has changed on this stage! Now it has a `constructor` which takes a `health` argument.

Let's modify our SuperHeroes so that `Warrior` has an initial health of `200` while the M`age has an initial health of `50`.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
