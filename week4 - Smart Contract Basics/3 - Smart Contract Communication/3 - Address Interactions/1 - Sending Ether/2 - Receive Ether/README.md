# Receive Function

In the latest versions of Solidity, contracts **`cannot receive ether`** by default.

In order to receive ether, a contract must specify a **`payable`** function. This is another keyword which affects the function's mutability similar to **`view`** and **`pure`**.

> 📖 In fact, in the ABI, a function's stateMutability can be one of four values: **`view`**, **`pure`**, **`payable`** and **`nonpayable`**. The last one is the default, it is **`nonpayable`** when we don't specify the state mutability.

Let's see a payable function in action:

```solidity
import "hardhat/console.sol";
contract Contract {
    function pay() public payable {
        console.log( msg.value ); // 100000
    }
}
```
☝️ Here the `msg.value` is the amount of ether sent to this function `pay` measured in Wei. Just by adding a `payable` keyword to this function we are able to accept ether. The ether is automatically stored in the contract's balance, no need to do anything else!

> 💭 What if someone tried to send a payment to a nonpayable function? The transaction will fail, sending the ether back to the sender.

In the case above we used the method `pay` as a `payable` function. This means we have to call this function in order to send the ether to the contract. What if we wanted to send it directly without specifying a method?

Turns out, we can do that too:

```solidity
import "hardhat/console.sol";
contract Contract {
    receive() external payable {
        console.log(msg.value); // 100000
    }
}
```

☝️ You'll notice that `receive` does not use the function keyword. This is because it is a special `function` (like `constructor`). It is the function that runs when a contract is sent ether without any **`calldata`**.

The receive function must be **`external`**, **`payable`**, it cannot receive arguments and it cannot return anything.

> 🔍 Another option to receive ether without specifying a function signature on a contract is to use a payable fallback function (Details section).

## 🏁 Your Goal: Store the Owner

Add a function to the `contract` that will allow it to recieve ether on a transaction without any **`calldata`**.

> 👀 If you take a look at the test cases you'll notice that the method used is the web3 sendTransaction which is the same method used to send ether from one Externally Owned Account to another. No bytecode data required.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```