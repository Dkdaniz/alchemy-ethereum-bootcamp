// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	enum ConnectionTypes { 
		Unacquainted,
		Friend,
		Family
	}

	// TODO: create a public nested mapping `connections` 
	mapping(address => mapping(address => ConnectionTypes)) public connections;
	
	function connectWith(address other, ConnectionTypes connectionType) external {
        // TODO: make the connection from msg.sender => other => connectionType
		connections[msg.sender][other] = connectionType;
	}
}