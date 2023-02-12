// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    event Deployed(address indexed owner);

    constructor(){
        emit Deployed(msg.sender);
    }
}