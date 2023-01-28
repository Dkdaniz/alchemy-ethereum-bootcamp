// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address owner;
    uint8 countTick = 0;

    constructor() {
        owner = msg.sender;
    }

    function tick() external {
        countTick++;
        
        if(countTick == 10){
            selfdestruct(payable(owner));
        }
    }
}