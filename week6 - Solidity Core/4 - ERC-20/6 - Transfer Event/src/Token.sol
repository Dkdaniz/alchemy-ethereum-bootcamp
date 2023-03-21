// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    uint256 public totalSupply;
    string public name = "My Token";
    string public symbol = "MTK";
    uint8 public decimals = 18;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed _from,  address indexed _to, uint256 _value);

    constructor() {
        totalSupply = 1000 * 10 ** 18;
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value, "account does not have sufficient balance");
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;

        emit Transfer(msg.sender, _to, _value);
    }
}