// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    constructor () payable {
        if(msg.value < 1 * 10**18){
            revert("contract requires least 1 ether");
        }
    }
}