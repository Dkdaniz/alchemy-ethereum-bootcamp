# Pure Functions

Occasionally there is the necessity for Solidity functions that neither read from nor write to state. These functions can be labeled as **`pure`**.

Let's say we wanted to add together two `uint` values:

```js
function double(uint x, uint y) external pure returns(uint) {
    return x + y;
}
```

☝️ This function is just performing simple arithmetic without reading/writing state so we can label it **`pure`**.

> ⚠️ If we tried attempted to modify state in a pure function the compiler would throw an error along the lines of "Function declared as pure, but this expression (potentially) modifies the state".

There's also an alternative syntax for returning values in Solidity:

```js
function double(uint x, uint y) external pure returns(uint sum) {
    sum = x + y;
}
```

☝️ Woah, that's new. 😲

In the `returns` keyword we specified the name of the returned parameter `sum`. Then we assigned the `x + y` to `sum` inside our function body. The value of `sum` is implicitly returned.

> ✅ A bit of a change-up from what we're used to from JavaScript! This return style is perfectly valid Solidity and quite often used.

## 🏁 Your Goal: Double Uint

1. Create an external, pure function called `double` which takes a `uint` parameter and doubles it. It should return this doubled `uint` value.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn mocha ./src/test.js
```