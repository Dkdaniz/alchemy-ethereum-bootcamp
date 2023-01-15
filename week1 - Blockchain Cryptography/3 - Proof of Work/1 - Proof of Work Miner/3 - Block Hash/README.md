# Block Hash

Typically, all the information in the header of the block is hashed together to create a unique hash based on those properties.

If anything changes in the header, it will affect the hash. Since each block also contains the hash of the block before it, it will affect every future block as well.

## 🏁 Your Goal: Add the Hash

1. Stringify the block object using JSON.stringify
2. Take the SHA256 hash of the stringified block object
3. Set the resulting value to a hash property on the mined block just before mining it

>⚠️ Do not add the `hash` property on the block until after calculating the hash!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```