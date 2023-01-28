# Function Modifiers

We can write **`modifiers`** on functions to run logic before and after the function body.

Let's see an example:

```solidity
import "hardhat/console.sol";
contract Example {
    function logMessage() public view logModifier {
        console.log("during");
    }

    modifier logModifier {
        console.log("before");
        _;
        console.log("after");
    }
}
```

☝️ Let's say we called `logMessage`, what would you expect the order of the logged messages to be? 🤔

It would be:

```
before
during 
after
```

Why? 🤨

Notice that the `logMessage` function signature is decorated with the `logModifier` modifier.

This modifier can add behavior to the function before and after the function body runs. The `_` in the `modifier` body is where the function body of the modified function will run.

## 🏁 Your Goal: Owner Withdrawal

You'll notice that the `onlyOwner` modifier has been added to each of the configuration functions in this contract. Only problem is, it doesn't currently do anything!

Update the `onlyOwner` modifier to require that **`only the owner address`** can call these functions without reverting.

> 💡 Remember to use the _ to indicate where the function body should go!

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```