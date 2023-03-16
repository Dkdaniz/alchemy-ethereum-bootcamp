// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Ownable {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "caller is not the owner");
        _;
    }

    function _transfer(address _newOwner) internal onlyOwner {
        owner = _newOwner;
    }
}

contract Transferable is Ownable{
    function transfer(address _newOwner) public onlyOwner {
        _transfer(_newOwner);
    }
}