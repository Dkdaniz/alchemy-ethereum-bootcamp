// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    event Deployed(address indexed owner);
    event Transfer(address indexed oldOwner, address indexed newOwner);

    address owner;
    
    constructor(){
        owner = msg.sender;
        emit Deployed(owner);
    }

    function transfer(address _newOwner) external {
        require(owner == msg.sender, "only owner can transfer ownership");
        
        address oldOwner = owner;
        owner = _newOwner;

        emit Transfer(oldOwner, _newOwner);
    }
}