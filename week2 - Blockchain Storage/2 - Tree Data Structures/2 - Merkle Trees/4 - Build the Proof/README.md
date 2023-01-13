# Build the Proof

Alright, now it's time to build the proof that a particular leaf node exists within a merkle tree!

With this proof, we'll only want to include the necessary hashes we need to create the root hash from our target leaf node.

## ABCDE Merkle Proof Example

```
      Root
     /    \
    ABCD   E
    / \    |
   AB  CD  E
  / \  / \ |
  A B  C D E
```

### Proof of C

Let's prove `C` is in the Merkle Root!

We build the path to create the root from `C`:

```
Hash(Hash(AB + Hash(C + D)) + E)
```

☝️ So the four hashes in use here are `AB`, `C`, `D`, and `E`. Since we're starting with `C`, we won't need it in the proof. We'll need to know `AB`, `D` and `E`.

Also we need to know the **`order in which they should be combined`**. `Hash(A + B)` will not be the same as Hash(B + A). Our proof should contain the `data` (the hash) and whether or not the node is in the `left` position.

Our resulting proof would look like this:

```js
[
 { data: 'D', left: false },
 { data: 'AB', left: true },
 { data: 'E', left: false }
]
```

☝️ By looking at this proof, we can easily concatenate to the root. We start with `C`, concatenate D on the right (`CD`), concatenate `AB` to the left (`ABCD`) and then concatenate E on the right to get the root `ABCDE`.

Look at that! We didn't even need to know `A` or `B`, just the combined hash of the two.

> 🔍 Check out Details for another example.

## 🏁 Your Goal: Add the getProof Method

Let's add a `getProof` method to our `MerkleTree` class. This function will take in an index of a leaf node and return a **`Merkle Proof`**.

The Merkle Proof will be an array of objects with the properties `data` (the hash) and `left` (a boolean indicating if the hash is on the left).

> 🔍 If you get stuck be sure to check out our Recommended Approach in the details section

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```