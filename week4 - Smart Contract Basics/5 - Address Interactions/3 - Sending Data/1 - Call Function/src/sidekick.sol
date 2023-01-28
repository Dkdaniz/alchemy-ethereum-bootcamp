// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IHero {
    function alert() external;
}

contract Sidekick {
    function sendAlert(address hero) external {
        IHero(hero).alert();
    }
}
