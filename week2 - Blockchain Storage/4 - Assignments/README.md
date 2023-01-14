# Merkle Tree Project

Hey there! 👋

After going through this week’s content you may be wondering, "why am I learning about trees and data storage this week?".

The reason is that blockchains have a storage problem. They require that n**`odes in the network store every value`** recorded in their shared database. For ethereum this means all account balances, as well as every persistent variable on a smart contract. As we begin to work with smart contracts next week we need to be careful how much data we are storing on the blockchain. The less data we store, the cheaper it will be.

## Merkle Tree Gift List 🎁

Your project this week is to build an application which gives out gifts, but only to names [on the list](https://github.com/ChainShot/GiftList/blob/main/utils/niceList.json). The catch is that on the server you are only allowed to store one 32 byte value in the server memory. This **`32 byte value`** has to be enough for the server to be able to determine who is [on the list](https://github.com/ChainShot/GiftList/blob/main/server/index.js#L10).

Here is your starter repository: https://github.com/ChainShot/GiftList

To get started, read the readme for further instruction!

💡 Hints

Think of the **`client`** as the **`prover`** here. They are the ones trying to prove to the server that the one name is in the list. Likewise think of the **`server`** as the **`verifier`** here. They are taking the client's proof and, using minimal information, able to verify that the name sent from the client is actually in the list.

Check out the `/utils` folder for everything you need for the Merkle Tree. Take a look at the `example.js` file to see how to create a root, create a proof, and verify that proof.

We modified the MerkleTree implementation so you won't have to! You can see we used a few helpers from the `ethereum-cryptography `library to convert between types.