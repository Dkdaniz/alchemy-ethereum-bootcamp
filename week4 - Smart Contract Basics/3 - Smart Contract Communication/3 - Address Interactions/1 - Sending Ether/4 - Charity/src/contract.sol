// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address public owner;
    address public charityAddress;

    constructor(address _charityAddress){
        owner = msg.sender;
        charityAddress = _charityAddress;
    }

    function tip() public payable {
        (bool sucess, ) = owner.call{ value: msg.value}("");
        require(sucess);
    }

    function donate() public payable {
        uint256 balanceContract = address(this).balance;
        (bool sucess, ) = charityAddress.call{ value: balanceContract }("");
        require(sucess);
    }

    receive() external payable {}
}