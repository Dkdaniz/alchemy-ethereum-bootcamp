// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library UIntFunctions {
    function isEven(uint256 _value) public pure returns(bool) {
        uint result = _value % 2;
        if(result == 0){
            return true;
        }

        return false;
    }
}