#  Adding Blocks

## ๐ Your Goal: Proof of Work

Let's create an `addBlock` function on our `Blockchain` class.

This function should take in a new block and add it to the `chain` array:

```js
const blockchain = new Blockchain();
const block = new Block("Charlie sent Dave 2 BTC");

blockchain.addBlock(block);

console.log(blockchain.chain.length); // 2
```

โ๏ธ Remember we should have both the genesis block and the new block now.

## ๐งช Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```