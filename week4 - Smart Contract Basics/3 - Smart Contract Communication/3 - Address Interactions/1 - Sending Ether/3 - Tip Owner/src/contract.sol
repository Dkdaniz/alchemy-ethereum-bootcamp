// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    function tip() public payable {
        (bool sucess, ) = owner.call{ value: msg.value}("");
        require(sucess);
    }

    receive() external payable {}
}