// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function sum(uint[] memory _values) pure external returns(uint256) {
        uint total;
        for(uint i = 0; i < _values.length; i++) {
            total += _values[i];
        }

        return total;
    }
}