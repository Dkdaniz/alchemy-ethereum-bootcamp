// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function sum(uint[5] memory _values) pure external returns(uint256) {
        uint total;
        for(uint i = 0; i < 5; i++) {
            total += _values[i];
        }

        return total;
    }
}