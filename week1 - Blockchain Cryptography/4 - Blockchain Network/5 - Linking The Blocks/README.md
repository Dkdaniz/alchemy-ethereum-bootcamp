# Previous Hash

It's time to add one more `crucial` input to our block's hash calculation: the `hash of the previous block` in the chain.

<img src="../../../img/previousHash.png">

This creates a chain where any change to the data of an earlier block will affect each subsequent block.

> 🔍 Let's take a look at what a change would do in [details](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3fa85ad9f997a550e7ca2b?tab=details).

## 🏁 Your Goal: Link Blocks

To link the blocks you have to accomplish two things:

1. Add a previousHash property to each block. The value of this property should be the hash of the block `before it` in the chain.
2. Use this previousHash property in the calculation of the block's hash.

> 💡 **`Hint`**

- A good spot to add the previousHash property on the block would be in the addBlock function, where a block is placed on the chain.
- So far, the Block class in your Block.js file does not yet contain a previousHash property and currently only hashes this.data of a block - you must also include the block's this.previousHash property in the toHash function!
- You can add multiple inputs to the SHA256 function by using the + operator, for example:

```js
const hash = SHA256("dog" + "cat); // hash of dog and cat together
```

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```