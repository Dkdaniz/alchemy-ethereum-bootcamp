# Fixed Arrays

Fixed sized arrays have a set amount of values at compile-time.

We can declare fixed size arrays in Solidity like so:

```solidity
uint[3] x = [1,2,3];
address[1] y = [0xc783df8a850f42e7F7e57013759C285caa701eB6];
bool[4] z = [true, true, false, false];
```

☝️ These arrays have their size determined at compile-time. They cannot grow or shrink in size.

> 📖 If you store less elements in the array than the fixed size, the rest of the elements will be the default value for the data type (i.e. `false` for `bool` and `0` for `uint`). If you store more elements in the array than the fixed size, you'll get a compile-time TypeError!

The above array declarations will work for state variables. Inside of a function, however, we will need to specify the data location of an array:

```solidity
uint[3] memory numbers = [1, 2, 3];
```

☝️ The data location for this array is `memory`.

Memory is temporary, it will only last as long as the transaction. Other data locations include `calldata` for arguments and `storage` for persistence.

> 🔍 Let's take a closer look at Data Location in details.

## Retrieve Elements 🔎

We can also retrieve elements from our array with numerical indexes:

```solidity
uint[3] memory numbers = [1, 2, 3];

console.log(numbers[0]); // 1
console.log(numbers[1]); // 2
```

## For Loops 🌀

For loops in Solidity have similar syntax as JavaScript and other C-family languages:

```solidity
for(uint i = 0; i < 10; i++) {
    // run statement
}
```

## 🏁 Your Goal: Find the Sum

1. Create a pure, external function sum which takes a fixed size array of **`five unsigned integers`**.
2. Find the sum of the unsigned integers and return it as a `uint`.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```