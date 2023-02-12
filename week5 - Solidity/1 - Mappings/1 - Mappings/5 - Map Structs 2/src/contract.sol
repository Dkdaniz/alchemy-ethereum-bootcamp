// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	struct User {
		uint balance;
		bool isActive;
	}

	mapping (address => User) public users;

	function createUser() external {
		require(users[msg.sender].isActive == false, "user already is active");
		users[msg.sender].balance = 100;
		users[msg.sender].isActive = true;
	}

	function transfer(address recipient, uint amount) external {
		require(users[recipient].isActive == true, "recipient no is active");
		require(users[msg.sender].isActive == true, "sender no is active");

		uint balanceSender = users[msg.sender].balance - amount;
		uint balanceRecipient = users[recipient].balance + amount;

		require(balanceSender >= 0, "balance no is valid");

		users[msg.sender].balance = balanceSender;
		users[recipient].balance = balanceRecipient;
	}
}