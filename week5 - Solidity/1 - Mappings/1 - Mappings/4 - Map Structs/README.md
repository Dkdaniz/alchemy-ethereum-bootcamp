# Map Structs

Here's where mappings get interesting! We can map to many different types. Let's start with structs:

```solidity
contract Market {
    // create the Collectible struct
    struct Collectible {
        address owner;
        bool forSale;
        uint price;
    }

    // map a uint ID to a Collectible struct
    mapping(uint => Collectible) idToCollectible;

    function purchase(uint _id) external payable {
        // find the collectible by the id passed in
        Collectible storage collectible = idToCollectible[_id];
        // purchase the collectible
        require(msg.value >= collectible.price);
        collectible.owner = msg.sender;
        collectible.forSale = false;
    }
}
```

☝️ We are able to lookup the collectible using the `uint` id passed into `purchase`. Then we have access to the struct to sell it to its new owner.

## 🏁 Your Goal: Sum and Average

Let's create a new token where every new user will receive 100 tokens!

1. Create a public mapping called users that will map an `address` to a `User` struct.
2. Create an external function called `createUser`. This function should create a new user and associate it to the `msg.sender` address in the `users` mapping.
3. The `balance` of the new user should be set to 100 and the `isActive` boolean should be set to `true`.

## 🔒 Contract Security
Ensure that the `createUser` function is called with an address that is not associated with an active user. Otherwise, revert the transaction.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```