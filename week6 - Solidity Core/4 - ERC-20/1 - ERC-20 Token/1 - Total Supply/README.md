# ERC20 Tokens

In this lesson, you will create a smart contract called a *8`* smart contract. You can think of tokens like dollars (or any other type of asset). Tokens can be given to other people, they can be lent to other people via allowances, and you can see how many tokens someone owns.

Each ERC20 token has its own **`supply`** which is the total number of the tokens that are in circulation. Tokens can be **`minted`** to addresses in any number of creative ways. The majority of the time they are minted to a single address and transferred to a crowdsale contract.

> 📖 The term **`mint`** here is used to describe the creation of a new token. It was traditionally used to describe the creation of new coins. The origins of this word are quite old, [according to Wikipedia](https://en.wikipedia.org/wiki/Mint_(facility)), it is originally attributed to 269 BC! 🏛️

## 🏁 Your Goal: Token Supply

Let's create a supply for our token!

1. Create a new public `uint` state variable called totalSupply.
2. Leave its value as the default `uint` value for now, `0`, we will change this later!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
