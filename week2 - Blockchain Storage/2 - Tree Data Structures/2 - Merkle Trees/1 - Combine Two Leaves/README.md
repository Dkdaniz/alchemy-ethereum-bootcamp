# Combine Two Leaves

Alright, let's build us a Merkle Tree! 🌲

A merkle tree will take an array of leaf nodes, combining them together two at a time, layer-by-layer, until they are reduced to a single root node. This forms a tree-like structure of hashing.

## 🏁 Your Goal: Root of Two Leaves

First, let's write a constructor for the `MerkleTree` class. This constructor will take **`two arguments`** passed in this order:

1. An **`array`** of leaf nodes
2. A combination **`function`** used to concatenate and hash **`two leaves`** together

> 🔍 Let's take a closer look at the details.

Next, let's add a function `getRoot` on the `MerkleTree` class. This function will find the merkle root.

For this stage you will only need to take two leaves and hash them together:

```
    Root
    /  \ 
   A    B
```
☝️ Here, `A` and `B` are the leaf nodes and the root is the result of the concatenation. Simply take the first and second leaf nodes and use the concatenate function to get the result.

> ⚠️ Don't worry about generalizing just yet! On the next stage we'll move onto some more in-depth scenarios.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```