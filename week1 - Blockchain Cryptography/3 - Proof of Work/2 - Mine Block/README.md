# Mining Blocks

In Bitcoin, blocks contain quite a bit of information in their header: the *software version*, a *timestamp*, the *merkle root* of its transactions, the *previous block hash*, and the *difficulty*.

## 🏁 Your Goal: Mine Block

The goal of this stage is to update the mine() fuction to create a new block with a unique identifier and add it to our blocks array.

For the purposes of this mining exercise, our block will be an object with a single property: an id that is equal to the block height prior to it being mined.

1. Update the `mine()` function to create a new block object with a single property: `id`
2. Set the `id` property to the block height prior to the new block being added
3. Push the block object into the `blocks` array

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```