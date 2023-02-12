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
}