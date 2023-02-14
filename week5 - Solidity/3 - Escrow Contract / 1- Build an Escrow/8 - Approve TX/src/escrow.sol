// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;

    bool public isApproved = false;

    event Approved(uint256 balance);

    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    function approve() external {
        require(msg.sender == arbiter, "only the arbiter can approve");
        require(isApproved == false, "contract already is approved");
        
        uint256 balance = address(this).balance;

        (bool sent, ) = payable(beneficiary).call{ value: balance }("");
        require(sent, "Failed to send ether");

        isApproved = true;

        emit Approved(balance);
    }
}