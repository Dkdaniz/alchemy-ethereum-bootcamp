# Chain Validation

Blockchains are run by a network of computers. When a computer finds a new block, it broadcasts its new version of the blockchain to all of its peers. There may be multiple versions of the blockchain at any given time. However, the `longest valid blockchain` is the accepted one.

> 🔍 Let's take a closer look at the logic behind this in [details](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3bb51dd9f997b30859bb81?tab=details).

## 🏁 Your Goal: Create an isValid Function

1. Create a function called `isValid` on our `Blockchain` that will return `true` or `false` if a block is valid or invalid respectively

2. `isValid` should check the integrity of every block in its chain by looking at each block's previousHash field and making sure that it is equal to the hash of the block before it

> To compare the output of the `SHA256` function you will need to convert it into a string (`.toString`) before comparing. Example:

```js
const hash1 = SHA256("a");
const hash2 = SHA256("a");

console.log(hash1 === hash2); // false
console.log(hash1.toString() === hash2.toString()); // true
```

> 👀 Notice that first one is `false`! These two are objects and are compared by `reference` which is why we need to convert it to a string!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```