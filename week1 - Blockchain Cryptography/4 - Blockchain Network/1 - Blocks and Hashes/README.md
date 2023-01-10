# Blocks and Hashes

Blockchain is aptly named! It is, in fact, a chain of blocks. 🅱️⛓️

Each block contains transactional data, some metadata describing the block itself, and a link to the previous block before it. These components are fed into a hash function to create a unique sequence of bits to represent the block.
## 🏁 Your Goal: Return a Hash

In your `Block.js` file, we have a class `Block`. Using the `SHA256` function from the [Crypto JS Library](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3afdd3d9f99763e5c4b502?tab=details&scroll=Crypto-JS), return a valid hash in the `toHash` function.

For now, there's no need to hash anything in particular since the block contains none of the components we mentioned above.

>🎨 Feel free to hash a message, your own name, or nothing at all! So long as it is a 64 character [hexidecimal](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3afdd3d9f99763e5c4b502?tab=details&scroll=Hexadecimal) string you will pass this stage.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```