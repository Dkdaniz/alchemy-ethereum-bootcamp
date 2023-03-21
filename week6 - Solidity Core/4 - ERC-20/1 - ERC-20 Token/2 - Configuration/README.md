# Token Configuration

When you look at a list of ERC20 tokens, like on [Etherscan](https://etherscan.io/tokens), you'll see each ERC20 token has its own **`name`** and **`symbol`** associated with it.

The name is generally its primary identifier, while the symbol is in parentheses. **`Maker (MKR)`**, for instance, has the name Maker and symbol MKR.

Each of these tokens will also generally have its own *`decimals`* value, indicating the number of places we need to move the decimal to get to the user representation of the token.

> 🔍 To understand **`decimals`** on a deeper level let's take a look at the details tab.

You may notice that some of the tokens listed on Etherscan have similar **`market capitalizations`** with wildy different prices. Why is this so? 🤔

Market Capitalization, or market cap for short, is simply the current price for the token multiplied by its total supply. Since many of these tokens have very different `totalSupply` values, their prices wind up quite different!

> 🧐 It's interesting to note that while these values are on most ERC20 tokens, they are, in fact, **`optional`**. An ERC20 token does not need to specify its **`name`**, **`symbol`** or **`decimals`** to adhere to the standard. These values are purely for added usability.

## 🏁 Your Goal: Configuration 🎛️

Create three public state variables:

1. A string name - Create any name you'd like with at least 1 character
2. A string symbol - Create any symbol you'd like with 3 characters
3. A uint8 decimals - Store 18 in this variable

> 💡 Most ERC20 tokens follow the ether standard of having 18 decimals.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
