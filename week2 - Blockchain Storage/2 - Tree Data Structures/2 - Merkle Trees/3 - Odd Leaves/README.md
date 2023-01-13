# Odd Leaves

Trees are great! We ❤️ trees 🌳🌴🎄

Even when those trees happen to be a bit... **`odd`**. 😄

## 🏁 Your Goal: Handle Odd Number of Leaves

Let's consider what happens in the case of an **`odd number of leaves`** in a tree.

Any time that there is no **`right`** pair to an element, we're just going to want to carry that leaf one layer up:

```
    Root
    / \ 
   AB  C
  / \  |
  A B  C
```
☝️ In this case we don't use the `C` node until we combine it with `AB` to create the Merkle Root. Let's handle this in our `getRoot` function.

> 🔍 Check out configurations for Other Odd Trees in the detail section.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```