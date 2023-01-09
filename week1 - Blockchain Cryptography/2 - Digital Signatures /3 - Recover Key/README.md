# Recover the Public Key
When the signature is passed with all of its components (recovery bit included), the public key can be recovered. This means that blockchain nodes will be able to understand who signed the transaction that was sent to them. A transaction could indicate the user would like to send 1 ether to another address and provide a certain transaction fee. Since the signature signs the hash containing this intention, it is enough to authenticate this action entirely.

## 🏁 Your Goal: Recover the Key

1. Given a message, signature, and recoveryBit find the public key and return it! Be sure to hash the message when passing it to the recovery method.

2. Use the [noble-secp256k1](https://github.com/paulmillr/noble-secp256k1). Documentation to find the correct method and parameters for this one.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```