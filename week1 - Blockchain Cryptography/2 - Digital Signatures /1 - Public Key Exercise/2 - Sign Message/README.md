# Signing the Hash

It's time to sign a message using our private key to prove our intention!

When signing a message with secp256k1 we can return the signature along with the recovery bit, allowing us to recover the public key from the signature. This will allow a blockchain node to take a signature of a transaction and understand which address authenticated this particular transaction.

>💡 This is an important point, a blockchain transaction not only indicates the intent of the person who signed it, it also authenticates them through public key cryptography! We'll see this more clearly when start signing transactions in future lessons.

## 🏁 Your Goal: Sign Message

Let's sign a message!

1. First step is to hash it using the hashMessage function you created in the last stage (we've already imported it for you on line 2)

2. Once you have the message hash, use the sign method from [ethereum-cryptography](https://github.com/paulmillr/noble-secp256k1#signmsghash-privatekey).

> **Note**
> * The sign method will take your message hash along with the constant PRIVATE_KEY declared at the top of the file. This private key is a valid key that could be used to authorize blockchain transactions. `Never use this specific key` because it is published on the internet, so many people including yourself could authenticate with this specific private key. In future lessons we'll be discussing good private key hygene to avoid losing funds.
> * The ethereum-cryptography library uses noble-secp256k1, so the import comes from ethereum-cryptography but the detailed documentation is in the readme of noble-secp256k1.


## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```