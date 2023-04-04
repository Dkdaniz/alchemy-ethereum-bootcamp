// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
    function dividesEvenly(uint256 x, uint256 y) public pure returns(bool){
        return x % y == 0;
    }

    function isPrime(uint256 x) public pure returns(bool){
        for(uint256 i=2; i < x; i++){
            bool isDividesEvenly = dividesEvenly(x, i);
            if(isDividesEvenly == true) {
                return false;
            }
        }

		return true;
    }
}