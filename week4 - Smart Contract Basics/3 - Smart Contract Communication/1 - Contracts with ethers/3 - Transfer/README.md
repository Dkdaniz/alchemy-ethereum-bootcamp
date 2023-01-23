# Multiple Arguments

Calling solidity contracts with multiple arguments in ethers.js is not much different from what you might expect!

We can define an `Adder` contract:

```js
// Adder.sol
contract Adder {
    function add(uint x, uint y) external pure returns(uint) {
        return x + y;
    }
}
}
```
Then we can call the contract from our JavaScript side:

```js
// callAdder.js
async function callAdder(adderContract) {
    const sum = await adderContract.add(1,4); 
    console.log(sum); // 5
}
```
Voilà! Multiple function arguments! 🎩

## 🏁  Your Goal: Transfer

1. In the `index.js` file, complete the `transfer` function to transfer value from the contract signer to the `friend` address.
2. The signer will also be the deployer of the contract. Their balance will be `1000` after deploying the contract.
3. Your task is to transfer some of this to the `friend`. It can be however much you want!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn mocha ./src/test.js
```