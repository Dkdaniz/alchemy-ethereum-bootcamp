// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    int8 public a;
    int8 public b;
    int16 public difference;

    constructor() {
        a = 10;
        b = -50;
        difference = a - b;
    }
}