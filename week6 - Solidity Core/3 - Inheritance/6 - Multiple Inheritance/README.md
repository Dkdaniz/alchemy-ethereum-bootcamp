# Multiple Inheritance

It's possible to inherit from **`multiple contracts`**.

The derived contract will inherit state variables and functions from each base contract:

```solidity
contract Base1 {
    uint a = 5;
}
contract Base2  {
    uint b = 10;
}
contract Derived is Base1, Base2 {
    // has access to both b and a!
}
```

☝️ You can see we specify the contracts to inherit from in a comma-separated list. The `Derived` contract is inheriting from both `Base1` and `Base2`.

🔍 When it comes to multiple inheritance, **`order matters`**! Let's take a closer look in details.

## 🏁 Your Goal: Collectible Transferable 💫

The `Collectible` contract now also inherits from `Transferable`, a contract which has not been created yet!

1. Your goal is to create a new contract `Transferable` that will allow the `Collectible` to transfer its ownership to another address.
2. In the `Transferable` contract, create a function called `transfer` which takes an address for the new owner.
3. Have this function transfer ownership from the current owner to the new owner passed in.
4. Ensure that this function **`can only be called by the current owner`**.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
