// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    uint256[] public evenNumbers;

    function filterEven(uint256[] memory _values) external {
        for(uint256 i = 0; i < _values.length; i++) {
            uint256 remainder = _values[i] % 2;
            if(remainder == 0){
                evenNumbers.push(_values[i]);
            }
        }
    }
}