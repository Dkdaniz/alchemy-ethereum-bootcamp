# Console Log

Do you miss our friend `console.log `from JavaScript? 😢

Well, miss it **`no longer`**! Now we can `console.log` in Solidity as well. 🎉

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";

contract Contract {
    constructor(uint x, string y, bool z) {
        console.log(x); // 1
        console.log(y); // Hello World!
        console.log(z); // true
    }
}
```

This method can take an `uint`, `string`, `bool`, or `address` as its argument. It will log the results to the console on execution.

> 🔍 There are a few more `console` methods available for other data types. Let's check them out in details.

## 🏁 Your Goal: Find the Secret!

There is a **`secret unsigned integer`** that will pass this stage. Your goal is to find what that secret is! 🔑

You can do so by logging the message passed to the constructor. Follow the message's instructions to pass the stage!

> 📖 You'll notice the keyword **`memory`** on the string argument. This is the string's "data location". We talked about this concept in the Week 5 Reference Types section.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```

