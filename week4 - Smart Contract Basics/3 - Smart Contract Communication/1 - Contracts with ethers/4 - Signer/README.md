# Signer

We've talked about the **`signer`** quite a bit in the past few stages, but what is it, exactly?

A signer represents an EOA we have control over. We can use it to sign transactions before sending them to the network.

When we create a Contract instance we connect with a signer so that we can transact with the contract easily!

We can also connect the contract with other signers when we need to run the same transaction with different addresses:

```js
// createUsers.js
async function createUsers(contract, signers) {
    for(let i = 0; i < signers.length; i++) {
        await contract.connect(signers[i]).createUser();
    }
}
```

☝️ In this example we are connecting the contract with different signers and calling the createUser method with each one.

> 📖 The function `connect` returns a new instance of contract connected with this signer. This makes it possible to "chain" the function with the method call to `createUser` as shown above. Each call will be made with a different signer.

The `msg.sender` value inside the contract will be the address of these users:

```js
// Contract.sol
import "hardhat/console.sol";
contract Contract {
    function createUser() external view {
        console.log(msg.sender); // 0xabc…
    }
}
```

☝️ The `createUser` function will be called once for each signer in the `signers` array.

## 🏁 Your Goal: Set Message

1. In the Contract you will find a `message` state variable. Your goal is to modify the message to contain anything other than an empty string.
2. The only problem is the `owner` cannot change this message! You'll need to connect the contract to a different `signer` in order to change it. In the `index.js` file you'll have access to the contract and a different `signer`.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn mocha ./src/test.js
```