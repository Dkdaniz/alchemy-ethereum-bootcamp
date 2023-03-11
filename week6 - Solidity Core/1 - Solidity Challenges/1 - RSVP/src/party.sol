// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint256 amount;

    mapping(address => bool) participants;

	constructor(uint256 _amount){
        amount = _amount;
    }

    function rsvp() external payable {
        require(participants[msg.sender] == false, "participant already registred");
        require(msg.value == amount, "value no is valid");

        participants[msg.sender] = true;
    }
}