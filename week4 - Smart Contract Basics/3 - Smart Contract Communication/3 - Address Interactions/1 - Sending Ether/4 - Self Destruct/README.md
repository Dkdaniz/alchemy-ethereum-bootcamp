# Self Destruct

Contracts can destroy themselves by using the `SELFDESTRUCT` opcode on the EVM!

This opcode actually **`refunds ether`** in order to incentivize folks to clean up the blockchain from unused contracts.

Let's see it in action:

```solidity
contract Contract {
    uint _countdown = 10;

    constructor() payable { }

    function tick() public {
        _countdown--;
        if(_countdown == 0) {
            // NOTE: we must cast to payable here
            // some solidity methods protect 
            // against accidentally sending ether
            selfdestruct(payable(msg.sender));
        }
    }
}
```

☝️ After 10 calls to the `tick` function the `Contract` will `selfdestruct`! 💥

So you might be wondering, why did we provide the argument `msg.sender`? 🤔

The address provided to the `selfdestruct` function gets all of the ether remaining in the contract! Ether sent to the `payable` constructor will be refunded to the final caller of the `tick` function.

> 🔍 Before self-destructing your smart contract you may want to consider the repercussions. Let's discuss this in details.

## 🏁 Your Goal: Self Destruct

When the `donate` function is called, trigger a `selfdestruct` in the contract!

> 💡 The `selfdestruct` will send all remaining funds to the `address` passed in, so it might be a good candidate to replace the existing functionality in your `donate` function by sending the funds to the `charity`! Just be sure to cast the `address` to an `address payable` as shown in the example above.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```