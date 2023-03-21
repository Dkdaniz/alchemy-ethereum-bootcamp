// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    uint256 public totalSupply;
    string public name = "My Token";
    string public symbol = "MTK";
    uint8 public decimals = 18;

    mapping(address => uint256) public balanceOf;

    constructor() {
        totalSupply = 1000 * 10 ** 18;
        balanceOf[msg.sender] = totalSupply;
    }
}