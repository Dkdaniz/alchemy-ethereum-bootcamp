// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function callAttempt(address contractWinner) external {
        bytes memory payload = abi.encodeWithSignature("attempt()");
        (bool success, ) = contractWinner.call(payload);
        require(success);
    }
}