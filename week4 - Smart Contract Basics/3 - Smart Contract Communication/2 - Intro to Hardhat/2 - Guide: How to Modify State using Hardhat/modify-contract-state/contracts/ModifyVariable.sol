//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract ModifyVariable {
  uint public x;
  string public message;

  constructor(uint _x) {
    x = _x;
  }

  function modifyToLeet() public {
    x = 1337;
  }

  function modifyMessage(string memory _newMsg) public {
    message = _newMsg;
  }
}