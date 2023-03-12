// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;

    constructor(address[] memory _owners, uint256 _required ){
        required = _required;
        owners = _owners;
    }
}