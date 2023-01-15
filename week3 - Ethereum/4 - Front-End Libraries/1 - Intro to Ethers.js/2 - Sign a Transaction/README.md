# Signing Transactions

When a transaction is broadcasted to Ethereum, how do we know who it's from? And how can we say for sure that **`they authorized it`**? 🤔

In the last stage, we created a wallet using a private key. Now we're going to use that wallet to sign a transaction in the details section!

## 🏁 Your Goal: Fill in the Properties

In this stage you'll need to modify the sign.js file . You may have noticed wallet1 has already been imported for you! We're going to use this wallet to sign a transaction. 🔑

We'll use the [wallet.signTransaction](https://docs.ethers.org/v5/api/signer/#Signer--signing-methods) method from the ethers.js library!

Since the library already knows our private key, all we need to do is fill in our properties and it will handle the digital signature! Fill in the `value`, `to`, `gasLimit` and `gasPrice` properties.

💶 value
For the `value`, we'll want to send 1 ether. The `value` property here is in Wei ([the smallest subdenomination of Ether](https://ethereum.org/en/eth/)).

> 📖 You could convert it yourself and supply it as a string (10^18 Wei = 1 Ether ). Alternatively you can use a parsing utility from Ethers in the details section.

📮 to
For the `to` property, supply an address, which would be a 40 character hexadecimal string. Here is the address to send the ether to:

> "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92"

> ⚠️ **`NOTE`** The below instructions use the legacy (Type 0) form of sending transactions on Ethereum. In future exercises we will use the newer version (Type 2) for sending transactions that has a much more efficient mechanism for gas estimation.

🌡️ gasLimit
The amount of gas required to transfer ETH from one account to another is 21000. Note that gas is an abstraction of computational complexity in the EVM and is not tied to any real world cost.

Since we are transferring ETH, the gasLimit needs to be set to 21000.

To calculate the actual cost (in Gwei) to transfer ETH from one account to another we need to use the Ethereum network's `baseFeePerGas`.

🕳️ baseFeePerGas
For historical and backwards-compatability reasons this property is still named **`gasPrice`** in popular Etherum front-end libraries such as ethers.js. However, protocol level code and docs will refer to this property as `baseFeePerGas`, which is semantically a more accurate name.

`baseFeePerGas` is the max amount of Gwei required per unit of gas used for the transaction to be included in the next block. The base fee is a dynamic value that moves up and down depending on network demand and is set by the network itself.

This value works similarly to how car gas prices work in real life. It takes the same amount of gas to get from point A to point B, but the price of the gas changes based on demand.

To calculate the minimum amount of Gwei needed to transfer ETH we use the formula: 21000 \* baseFeePerGas. When the transfer transaction executes this amount of ETH will be burned by the network.

🗒️ Notes

- Developers should almost never set this value directly as it is calculated by the network itself.
- Instead, if developers want to create 'dynamic fee' transactions the developer should leave this field empty and set the `maxPriorityFeePerGas` and `maxFeePerGas` fields described below. However, even using these fields is the exception rather than the rule.
- If you'd like to know more about the historical `gasPrice` field you can read more about the details of it in the docs on [Ethereum's London Upgrade](https://eips.ethereum.org/EIPS/eip-1559).

💁 maxPriorityFeePerGas
An extra amount of Gwei per unit of gas beyond the base fee that one is willing to pay to give priority to their transaction to being included in the next block. Think of it as a tip to the block validator creating the next block. This extra amount of Gwei goes to the validator and does not get burned.

⚠️ Developers should usually leave this value unset and use the default value that ethers.js determines from the network.

✋ maxFeePerGas
The combined (base fee + priority fee) maximum amount of Gwei per unit of gas one is willing to pay to have their transaction included in the next block.

⚠️ Developers should usually leave this value unset and use the default value that ethers.js determines from the network.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
