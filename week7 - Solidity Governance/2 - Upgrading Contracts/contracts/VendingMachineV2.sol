// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV2 is Initializable {
  // these state variables and their values
  // will be preserved forever, regardless of upgrading
  uint public numSodas;
  address public owner;

  function initialize(uint _numSodas) public initializer {
    numSodas = _numSodas;
    owner = msg.sender;
  }

  function purchaseSoda() public payable {
    require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");
    numSodas--;
    // challenge: add a mapping to keep track of user soda purchases!
  }

  function withdrawProfits() public onlyOwner {
    require(address(this).balance > 0, "Profits must be greater than 0 in order to withdraw!");
    (bool sent, ) = owner.call{value: address(this).balance}("");
    require(sent, "Failed to send ether");
  }

  function setNewOwner(address _newOwner) public onlyOwner {
    owner = _newOwner;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }
}