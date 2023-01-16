// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint8 public a;
    uint16 public b;
    uint256 public sum;

    constructor() {
        a = 10;
        b = 500;
        sum = a + b;
    }
}