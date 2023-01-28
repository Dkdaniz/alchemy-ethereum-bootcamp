# Value Transfer

We're making some strong progress! Up to this point we have called functions, made transactions and sent function arguments with both.

Now it's time to learn how to send **`ether`** with our transaction!

Let's consider a contract with a `payable` function:

```js
// Charities.sol
contract Charities {
    mapping(uint => uint) balances;
    function donate(uint id) external payable {
        balances[id] += msg.value;
    }
}
```

☝️ Each charity has an `id` that maps to a `uint` balance. The `donate` function will add the value sent to the function to the associated charity's balance.

We can call the `donate` method from `ethers.js` and provide ether:

```js
// donate.js
const ethers = require('ethers');
async function donate(contract, charityId) {
    await contract.donate(charityId, {
        value: ethers.utils.parseEther("5")
    });
}
```

☝️ This will send 5 ETH to the donate function which will store it in the `balances` mapping associated with the `charityId`.

You'll notice that the first argument passed here was the `charityId`, matching the Solidity signature. The second argument we passed in is called the **`overrides`** object. In this object we can specify the **`value`**, which is how much ether we'd like to send. This object must be passed in **`last`** after all the other argument functions.

> 📖 Along with the *`value`* there are four other values that can be specified in the overrides object of a transaction: **`gasLimit`**, **`gasPrice`**, **`nonce`** and **`chainId`**.

> 🏁 Your Goal: Make a Deposit
Complete the `deposit` function within the `index.js` to call the contract and deposit at least 1 ether.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn mocha ./src/test.js
```