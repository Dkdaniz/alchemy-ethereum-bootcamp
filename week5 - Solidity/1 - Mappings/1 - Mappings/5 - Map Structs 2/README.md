# Nested Mappings

As shown in the previous stage, we can provide more complex types in our mapping values.

Last stage we showed it with structs, now let's try it with `other mappings`!

```solidity
mapping(uint => mapping(address => bool)) voteToAddressChoice;

function getVote(uint _id, address _addr) 
    external
    view 
    returns(bool)
{
    return voteToAddressChoice[_id][_addr];
} 
```
☝️ In this scenario each **`vote id`** points to a **`mapping of addresses to bool`** votes. This allows each address to register a different vote with each vote id.

As a voter we might call a function with an id to register our choice:

```solidity
function registerVote(uint _id, bool _choice) external {
    voteToAddressChoice[_id][msg.sender] = _choice;
}
```

Let's say there were 3 votes with the ids: `212`, `72` and `409`.

We could for make the following transactions from an EOA:

```js
// for true for vote id 212
registerVote(212, true);
// for false for vote id 72
registerVote(72, false);
// for true for vote id 409
registerVote(409, true);
```

☝️ This would register a `true` for the ids `212` and `409` at our address. For `72` it would register `false`.

> 📖 Of course, the default value for a `bool` is `false`, so this second vote may be pointless unless we were to add in some other way to provide an non-existent vote.

## 🏁 Your Goal: Sum and Average

1. Create a public mapping called `connections` which will map an `address` to a mapping of an address to a `ConnectionTypes` enum value.
2. In the `connectWith` function, create a connection from the `msg.sender` to the `other` address.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```