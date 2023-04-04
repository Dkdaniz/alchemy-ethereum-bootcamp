// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
    function dividesEvenly(uint256 x, uint256 y) public pure returns(bool){
        uint256 result  = x % y;
        if(result > 0){
            return false;
        }

        return true;
    }
}