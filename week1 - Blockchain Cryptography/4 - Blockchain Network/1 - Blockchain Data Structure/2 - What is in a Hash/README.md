# Adding Data to the Hash

Now it's time to add `data` to our hash. This will ensure that the block's hash is tied to its [contents](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3b0b26d9f99763e5c4b518?tab=details!

## 🏁 Your Goal: Hash the Data

When creating a new block, `data` will be passed to its constructor:

```js
const block = new Block("Alice sent Bob 1 BTC");

console.log( block.data ); // Alice sent Bob 1 BTC
```
☝️ As shown above, let's add a data property to the Block.

1. Add a constructor to our Block class that takes one argument data and assigns it to this.data

2. Once you have added data to the block, use this data to calculate the block's hash in the toHash function!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```