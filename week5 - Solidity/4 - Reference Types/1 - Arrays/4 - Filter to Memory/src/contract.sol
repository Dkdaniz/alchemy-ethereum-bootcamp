// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";

contract Contract {
    function filterEven(uint256[] calldata _values) 
        external 
        pure 
        returns(uint256[] memory) 
    {
        uint256 totalElementsEvenNumbers = 0;
        for(uint256 i = 0; i < _values.length; i++) {
            uint256 remainder = _values[i] % 2;
            if(remainder == 0){
                totalElementsEvenNumbers++;
            }
        }

        uint256[] memory evenNumbers = new uint256[](totalElementsEvenNumbers);
        uint256 countEvenNumbers = 0;
        
        for(uint256 i = 0; i < _values.length; i++) {
            uint256 remainder = _values[i] % 2;
            if(remainder == 0){
                evenNumbers[countEvenNumbers] = _values[i];
                countEvenNumbers++;
            }
        }
        
        return evenNumbers;
    }
}