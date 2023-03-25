# Send ERC20s to Contracts

Something that can often be difficult to understand is how to integrate ERC20 tokens into other smart contracts in the ecosystem. This video talks about how to develop a mental model, as a developer, around interacting with ERC20 tokens:

Access Video [ERC20 Token Standard](https://university.alchemy.com/course/ethereum/md/63b7650acb47730004b8de1b)

## Approve/TransferFrom

This two step process allows us to transfer tokens to a smart contract and allows the smart contract to account for that transfer.

The first transaction we interact with the ERC20 contract using the approve method:

```solidity
contract ERC20 {
    mapping (address => mapping (address => uint256)) allowed;

    // ...

    function approve(address spender, uint256 value) public returns (bool success) {
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
}
```
☝️ This `approve` method will give the `spender`, which is generally a smart contract address, the ability to spend tokens on behalf of the `msg.sender`. This sets up the second step:

The second transaction we call the `Spender` smart contract to spend to pull our tokens;

```solidity
contract Spender {
    mapping(address => uint) pooled;
    address erc20;

    // ...

    function poolTokens(uint256 amount) public returns (bool success) {
        // pull the tokens from the msg.sender using transferFrom
        bool success = ERC20(erc20).transferFrom(msg.sender, address(this), amount);
        require(success);
        
        // account for this balance update 
        pooled[msg.sender] += amount;
    }
}

contract ERC20 {
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    
    // ...

    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        balances[to] += value;
        balances[from] -= value;
        allowed[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}
```

☝️ In this case, we would call `poolTokens` on `Spender` and this contract would pull those tokens from the `ERC20` contract. Then the `Spender` contract can account for this balance change, by keeping its own record in the `pooled` mapping.

## Bucket Challenge 💧

Give `approve/transferFrom` a shot by attempting the Bucket challenge!

<img style="display: block; margin-left: auto; margin-right: auto;width: 50%;" src="../../../img/bucket_1.jpg>

No, not that [Bucket Challenge](https://en.wikipedia.org/wiki/Ice_Bucket_Challenge) 😅. This one:

<img style="display: block; margin-left: auto; margin-right: auto;width: 50%;" src="../../../img/bucket_2.jpg>

## 🏁 Your Goal: Emit Winner 🏁

1. Emit a winner event by successfully depositing an ERC20 token into this smart contract: https://goerli.etherscan.io/address/0x873289a1aD6Cf024B927bd13bd183B264d274c68#code

> Hint: Check out the source code on Etherscan to see the method you'll need to call. You can use the ERC20 you created on Goerli in an earlier guide!

## My Transaction Info

**`My Wallet`**: 0x05f0296fae0fd08519065e80505f3c88d0d7572b
**`My Token Address`**: 0x1e1561b43F6E6C34ccf497a6020e2BaBd5Ee5341
**`Tx`**: https://goerli.etherscan.io/tx/0x9979fab579b102bc8ea32d10e5506e8e52629878f8953591fc36c4283a28e498


### Proof of Authenticity

**`Verify`**: https://codesandbox.io/s/ibuxj
**`My Wallet`**: 0x05f0296Fae0FD08519065E80505f3c88D0d7572B
**`Message`**: https://goerli.etherscan.io/tx/0x9979fab579b102bc8ea32d10e5506e8e52629878f8953591fc36c4283a28e498
**`Signature`**: 0x6284be9fd7b65b6f2ee1dfd7b8adc8288746eb4a479e68732a7e51fc6822f3fa2e460e013611a0a5cf76896f02f058f68b158a800ba0c505bb0fc817a08e3a8a1c

## 🧪 Run script

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
mocha test.js
```
