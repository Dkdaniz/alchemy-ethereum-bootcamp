// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    event Deployed(address indexed owner);
    event ForSale(uint256 price, uint256 timestamp);
    event Transfer(address indexed oldOwner, address indexed newOwner);

    address owner;
    uint256 price;
    
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

    function markPrice(uint256 _price) external {
        require(owner == msg.sender, "only owner can set price");
        price = _price;
        emit ForSale(price, block.timestamp);
    }
}