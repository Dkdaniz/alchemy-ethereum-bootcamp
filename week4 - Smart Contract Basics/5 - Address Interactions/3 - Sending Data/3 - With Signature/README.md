# Encode With Signature

As a bit of a shortcut to the previous stage, we can learn about the method `abi.encodeWithSignature!` This method will do everything we did in the last stage, in one function.

So this:

```solidity
bytes4 memory payload = abi.encodePacked(bytes4(keccak256("rumble()")));

(bool success, ) = hero.call(payload);
```

Becomes:

```solidity
bytes memory payload = abi.encodeWithSignature("rumble()");

(bool success, ) = hero.call(payload);
```

And if you want to add arguments, you can add them to signature and as comma separated arguments to the `encodeWithSignature` method. If `rumble` took two `uint` arguments, we could pass them like this:

```solidity
bytes memory payload = abi.encodeWithSignature("rumble(uint256,uint256)", 10, 5);

(bool success, ) = hero.call(payload);
```


## 🏁 Your Goal: Alert the Hero with Arguments

Alert the `Hero` by calling `alert` and passing the number of enemies and whether or not they are armed!

> 🔍 Be careful! The type `uint` is an alias for `uint256` but only `uint256` will work with `abi.encodeWithSignature`. Click on the details to learn more.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```