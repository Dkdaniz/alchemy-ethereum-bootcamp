// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hero {
    bool public alerted;

    function alert() external {
        alerted = true;
    }
}