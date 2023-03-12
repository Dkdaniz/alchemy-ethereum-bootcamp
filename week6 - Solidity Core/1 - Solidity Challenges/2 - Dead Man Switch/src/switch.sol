// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address payable recipient;
    address owner;

    uint256 lastTimePing;

    constructor(address _recipient) payable {
        recipient = payable(_recipient);
        owner = msg.sender;
        lastTimePing = block.timestamp;
    }

    function withdraw() external payable {
        require(recipient == msg.sender, "only recipient can call this method");
        
        uint256 timeLimit = lastTimePing + 52 weeks;
        require(block.timestamp >= timeLimit, "time limit no reached");
        
        uint256 balanceContract = address(this).balance;
        recipient.transfer(balanceContract);
    }

    function ping() external {
        require(owner == msg.sender, "only owner can call this method");
        lastTimePing = block.timestamp;
    }
}