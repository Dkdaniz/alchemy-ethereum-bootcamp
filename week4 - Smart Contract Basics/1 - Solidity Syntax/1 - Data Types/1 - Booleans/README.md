# Unsigned Integers

What the heck is an unsigned integer? 🤨

First, let's go over integers. Integers include all positive and negative numbers without fractions. The numbers `-2`,`-1`,`0`,`1`,`2` are all integers. This range continues in both the positive and negative direction as far as you can count!

To determine if the number is above or below zero we use the **`sign`**: `+` or `-`. An **`unsigned integer`** is an integer that has no sign. 😲

Solidity has a specific data type for unsigned integers called `uint`. A `uint` can be suffixed with the number of bits reserved for it. For instance `uint8` means that there are **`eight bits`** provided for the value of the variable.

What is the range of unsigned integers in eight bits? 🤔

Eight bits can range from `00000000` to `11111111`. This range can represent **`256`** unique values.

Since the range of unsigned integer values does not include negative numbers, it is simply `0` to `255`. In decimal, the unsigned value of `00000000` is `0` and the value of `11111111` is 255.

> 🔍 Wondering what happens if we add two `uint8` values together whose sum will exceed `255`? Let's take a look at this in details.

## 🏁 Your Goal: Create Unsigned Integers!

Let's create three public state unsigned integers in our Contract: `a`, `b`, and `sum`.

1. Define the variable a as an uint8 with an initial value between `0` and `255`.

> 💡 If you declare the variable `a` as a `uint8` you will actually be unable to store a value outside the range `0` to `255`. If you try this directly in your program, you'll get a comrpile-time error!

2. Define the variable `b` as an `uint16` with a value of at **`least 256`**. The range for a `uint16` is `0` to `65535`.

3. The variable `sum` should be a `uint256` with the sum of the values stored in `a` and `b`.

> 🔍 It's perfectly valid to add a `uint8` and a `uint16` and store them in a `uint256`. Mix it up!

In Solidity we can use the same math operators we've become familiar with from JavaScript `+`, `-`, `*`, `/`. `%` and `**`.

> ✅ You can use `uint256` or `uint` to declare the `sum`. The keyword `uint` is an alias for `uint256` and it is often used!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
