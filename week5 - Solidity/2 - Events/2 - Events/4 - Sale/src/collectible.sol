// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    event Deployed(address indexed owner);
    event ForSale(uint256 price, uint256 timestamp);
    event Purchase(uint256 amount, address indexed buyer);
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

    function purchase() external payable {
        require(price != 0, "collectible not available for sale");
        require(msg.value >= price, "value no is enough");

        uint256 change = msg.value - price;
        if(change > 0) {
            (bool successChange, ) = payable(msg.sender).call{ value: change }("");
            require(successChange);
        }

        (bool successPrice, ) = payable(owner).call{ value: price }("");
        require(successPrice);
        
        uint256 oldPrice = price;

        owner = msg.sender;
        price = 0;

        emit Purchase(oldPrice, owner);
    }

}