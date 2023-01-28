// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Contract {
    function sumAndAverage(
        uint256 num1, 
        uint256 num2, 
        uint256 num3, 
        uint256 num4
    ) external pure returns(uint256, uint256){
        uint256 sum = num1 + num2 + num3 + num4;
        uint256 average = sum / 4;

        return (sum, average);
    }
}