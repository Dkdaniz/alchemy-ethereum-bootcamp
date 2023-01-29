// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    mapping (address => bool) public members;

    function addMember(address _member) public {
        members[_member] = true;
    }
}