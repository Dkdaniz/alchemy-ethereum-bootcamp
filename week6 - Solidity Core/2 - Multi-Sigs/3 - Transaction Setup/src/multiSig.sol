// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;

    struct Transaction {
        address destination;
        uint256 amount;
        bool executed;
    }

    Transaction[] public transactions;

    constructor(address[] memory _owners, uint256 _required ){
        uint256 ownersLength = _owners.length;
        
        require(ownersLength > 0, "number of owners cannot be zero");
        require(_required > 0, "_required cannot be zero");
        require(_required < ownersLength, "required cannot be more than the total of owners");
        
        required = _required;
        owners = _owners;
    }

    function transactionCount() external view returns (uint256) {
        return transactions.length;
    }
}