// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Game2 {
  bool public isWon;
  mapping(uint => bool) switches;

  function switchOn(uint key) payable external {
    switches[key] = true;
  }

  function win() external {
    require(switches[20]);
    require(switches[47]);
    require(switches[212]);

    isWon = true;
  }
}