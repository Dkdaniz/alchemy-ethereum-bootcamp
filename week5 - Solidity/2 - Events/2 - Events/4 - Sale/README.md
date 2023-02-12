# Sale

## 🏁 Your Goal: Make a Purchase!

1. Create an event called Purchase which takes two arguments: a uint for the purchase amount, and an address for the buyer.
2. Create an external, payable function purchase which allows a buyer to purchase the collectible at the asking price.
3. To make this purchase happen you'll need to do 3 things:
    1. Transfer the msg.value to the seller.
    2. Transfer the ownership to the buyer.
    3. Mark the collectible as not for sale any longer.
    4. Emit a Purchase event.

**`Reminder`** - To send ether, you can use the `.call` syntax. Let's say we're trying to send the msg.value to an address called `anAddress`:

```solidity
(bool success, ) = anAddress.call{ value: msg.value }("");
require(success);
```

## 🔒 Function Security

1. Ensure that the value sent matches the price. It it doesn't, revert the transaction. We don't want to allow someone to buy this for cheaper than the asking price!
2. Ensure that the collectible was marked for sale prior to this transaction. If it wasn't, revert the transaction.
   
> 📖 The default value for a `uint` is `0`. If you store the price in a uint you can use this as the **`not-for-sale`** default value. We will not call this function for a "free purchase".

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```