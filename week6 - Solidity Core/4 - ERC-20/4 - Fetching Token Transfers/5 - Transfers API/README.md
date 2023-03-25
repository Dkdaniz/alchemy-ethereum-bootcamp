# Transfers API
Are you thinking to yourself that `eth_getLogs` seems complicated to use? It probably seems like quite a generic method. When you think about it from the protocol's perspective this makes sense! The underlying protocol knows nothing about EIP standards, so it's not aware of things like NFTs and ERC20s. Fortunately, at Alchemy we've built a tool specifically for this use case: the [Alchemy Transfers API](https://docs.alchemy.com/reference/alchemy-getassettransfers).

The Alchemy Transfers API is a powerful tool that makes it easy for developers to fetch historical transaction data for any address. It's a fast and efficient alternative to scanning the entire blockchain, so you can focus on building great user experiences without having to worry about the technical details.

## 🏁 Your Goal: Use the Transfers API

Ok, we admit it! We've been eagerly awaiting this stage. It's time for you to try the Transfers API yourself with the [Alchemy SDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart)! We want you to return the **`total number of ERC20 transfers `**(any ERC20 token) that a specific address made between fromBlock and `toBlock`. This sort of query is super easy to make with the `getAssetTransfers` method!

1. Take a look at the [getAssetTransfers](https://docs.alchemy.com/reference/alchemy-getassettransfers) documentation to see the params we can send through.
2. For the `fromAddress` let's use the same address we used in the previous stage: `0x28c6c06298d514db089934071355e5743bf21d60`.
3. For the `category` we'll provide `'erc20'` as the only category.
4. Lastly, inspect the response with `console.log`. Find out the total number of transfers for this time period and return that number.

That's it! Much simpler than hashing topics in `eth_getLogs`, huh? And we're doing this **`for all ERC20 contracts`**, wow! That's just a taste of the power of the Transfers API. What kind of awesome user experiences could you build with this API?

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
mocha test.js
```
