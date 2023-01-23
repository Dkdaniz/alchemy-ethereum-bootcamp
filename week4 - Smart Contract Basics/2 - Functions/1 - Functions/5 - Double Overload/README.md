# Pure Functions

In Solidity it is perfectly valid to declare two functions with the same name if they have different parameters:

```js
function add(uint x, uint y) external pure returns(uint) {
    return x + y;
}

function add(uint x, uint y, uint z) external pure returns(uint) {
    return x + y + z;
}
```

☝️ Solidity will call the function signatures that matches the arguments provided. For example, `add(2,4)` will invoke the first funciton while `add(2,3,4)` will invoke the second function.

Also, Solidity can return multiple values from functions:

```js
function addTwo(uint x, uint y) external pure returns(uint, uint) {
    return (x + 2, y + 2);
}
```

☝️ Notice that the `returns` keyword specifies two return values. Also we are wrapping the values in a parenthesis in order to return multiple values. This is referred to as a **`tuple`**.

> 📖 **`Tuples`** are not a formal type in Solidity. They are a list of values that can be used as a temporary structure to return values or do assignment destructuring. The data types in tuples can be mixed.

We can also use tuples in assignment destructuring. Let's invoke the function addTwo which we just defined above:

```js
(uint x, uint y) = addTwo(4, 8);
console.log(x); // 6
console.log(y); // 10
```

## 🏁 Your Goal: Double Uint

1. Create another pure external/public function `double` which takes two `uint` parameters.
2. Double both of the arguments and return both of them in the same order they were passed into the function.

> 💡 For this solution, it is possible to use the `double` function from the previous stage in this solution. You may need to change the visibility from `external` to `public` so that you can call it internally as well.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn mocha ./src/test.js
```