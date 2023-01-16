// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	bytes32 public msg1;
    string public msg2;

    constructor() {
        msg1 = "Hello World";
        msg2 = "Daniel Marques - Blockchain Developer";
    }
}
