# Token Transfers

Both the balances mapping and the **`balanceOf`** function can be used to get the balance of a given Ethereum address in the token contract.

To transfer tokens, the sender's balance should be decreased by the transfer amount. Then, the balance of the recipient of the transfer should be increased by the same amount.

The balance of the sender can be decreased as follows:

```soldiity
contract Token {
    mapping (address => uint256) balances;

    function decreaseBalance(uint256 _value) public {
        balances[msg.sender] -= _value;
    }
}
```

☝️ This function will decrease the balance of the` msg.sender` by the specified `_value`.

## 🏁 Your Goal: Transfer

Create a public function `transfer` which takes an address for the recipient and a `uint` for the amount to be transferred.

Transfer the amount from the function caller to the recipient.

Return `true` after a successful transfer.

## 🔒 Contract Security

Ensure that `msg.sender` has enough in their balance to send this amount. Otherwise, revert the transaction.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
