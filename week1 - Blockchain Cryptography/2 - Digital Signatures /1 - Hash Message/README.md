# Hashing Messages

The first step in ECDSA is to hash the message before applying the signature algorithm. So if you wanted to sign a message with one your keypairs saying that you "Vote Yes on Proposal 327", the first step would be to hash this message:

```js
turn this into an array of bytes, the expected format for the hash algorithm

const bytes = utf8ToBytes("Vote Yes on Proposal 327");

// hash the message using keccak256
const hash = keccak256(bytes); 

console.log(toHex(hash)); // 928c3f25193b338b89d5646bebbfa2436c5daa1d189f9c565079dcae379a43be
```

👆🏻 After we have the message hash we can sign it with our private key to prove that a particular address votes yes on proposal 327. You may have found yourself doing something similar if you have ever signed a message in web3. When you send a transaction to a blockchain you also sign a hashed representation of that transaction before sending it to a blockchain node.

## 🏁 Your Goal: Hash the Message
The ethereum-cryptography library provides us with all of the cryptography we're going to need throughout this course. Let's make use of the keccak256 hash and utf8ToBytes function.

Your first step is to take the string message passed in and turn it into an array of UTF-8 bytes. You can do so with the utf8ToBytes function.
Then take the keccak256 hash of those bytes and return this value.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```