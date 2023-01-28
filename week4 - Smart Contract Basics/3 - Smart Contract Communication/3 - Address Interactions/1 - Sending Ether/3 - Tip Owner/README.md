# Transferring Funds

We can make any regular function **`payable`**. This allows us to differentiate the purpose of the ether coming into the smart contract.

Perhaps a contract has two addresses and we wanted to be able to pay one or the other:

```solidity
contract Contract {
    address public a;
    address public b;
    
    constructor(address _a, address _b) {
        a = _a;
        b = _b;
    }

    function payA() public payable {
        (bool s, ) = a.call{ value: msg.value }("");
        require(s);
    }

    function payB() public payable {
        (bool s, ) = b.call{ value: msg.value }("");
        require(s);
    }
}
```

☝️ We have two pay methods `payA` and `payB` which will transfer ether to the respective address. It takes a uint amount of Wei and transfers it from the contract account to the address.

## 🏁 Your Goal: Transfer Tips

Let's create a way to tip the contract owner!

Create a public payable function `tip` which sends any of its received ether to the `owner`.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```