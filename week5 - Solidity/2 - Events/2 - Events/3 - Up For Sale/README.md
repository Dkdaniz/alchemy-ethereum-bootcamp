# Up For Sale

## 🏁 Your Goal: Mark the Price

1. Create a new event called ForSale which takes two uint parameters: the price and the current block timestamp.
2. Create a new external function called markPrice which has a single uint parameter: the asking price.
3. Inside the markPrice function, emit the ForSale event with the price and block timestamp as its arguments. HINT: block.timestamp is a global variable

## 🔒 Function Security

Ensure that the person calling this function **`is the current owner `**of the collectible. Otherwise, revert.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```