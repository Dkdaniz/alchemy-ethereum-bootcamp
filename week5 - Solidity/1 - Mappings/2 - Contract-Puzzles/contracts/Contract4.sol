// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Game4 {
  bool public isWon;

  mapping(address => mapping(address => bool)) nested;

  function write(address x) external {
    nested[x][msg.sender] = true;
  }

  function win(address y) external {
    require(nested[msg.sender][y], "Nope. Try again!");

    isWon = true;
  }
}