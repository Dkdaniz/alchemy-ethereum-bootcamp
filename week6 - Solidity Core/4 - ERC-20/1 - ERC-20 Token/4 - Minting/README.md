# Minting

It's time to create our tokens and do the initial distribution!

## 💰 Setting the Supply
We can set the initial supply based on the number of tokens we want available. This will be the number of whole tokens multiplied by `10 ** 18` for the `18` decimals we supplied.

If we only wanted 5 total tokens in circulation it would be `5 * (10 ** 18)` or `5000000000000000000`. We could distribute these 5 tokens with 18 decimal places of precision.

## 🏦 Set the Balance

Depending on the circumstance, tokens can be distributed in different ways:

- For instance, tokens can be minted as needed, which is useful for an uncapped distribution.
  - This could work for a timed crowdsale or perhaps through a game that requires participation to receive tokens.
- Tokens can also be distributed upfront to a single address.
    - This address is then the sole owner of all the tokens and they can choose how to distribute the tokens as necessary. They can move it all into a crowdfunding contract or they can distribute it manually.

We're going to go with the latter of the two above approaches!

## 🏁 Your Goal: Supply

Create a constructor which will do two things:

1. Set the totalSupply to 1000 tokens
2. Set the balance of the contract deployer to be the totalSupply

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
