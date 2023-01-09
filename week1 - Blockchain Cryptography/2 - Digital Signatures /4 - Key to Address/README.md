# Public Key to Address
Bitcoin and Ethereum both have a transformation process to take a public key and turn it into an address. For Bitcoin it includes a checksum and Base58 encoding. Ethereum's address transformation is quite a bit simpler, its address is the last 20 bytes of the hash of the public key.

The important thing to recognize here is that the address is differentiated from the public key, but you can always derive the address if you have the public key.

## 🏁 Your Goal: Recover the Key

Let's get the ethereum address from the public key!

1. First step, you'll need to take the first byte off the public key. The first byte indicates the format of the key, whether it is in the compressed format or not. The publicKey will be a Uint8Array so you can use the [slice method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice) to slice off the first byte.
2. Next, take the keccak hash of the rest of the public key.
3. Finally, take the last 20 bytes of the keccak hash and return this. Once again, you can make use of the [slice method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice).

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```