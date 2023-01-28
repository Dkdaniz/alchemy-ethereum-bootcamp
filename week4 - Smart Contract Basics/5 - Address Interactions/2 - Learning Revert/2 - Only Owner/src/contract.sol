// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address public owner;
    error NotIsOwner();

    constructor () payable {
        if(msg.value < 1 * 10**18){
            revert("contract requires least 1 ether");
        }

        owner = msg.sender;
    }

    function withdraw() public {
        if(msg.sender != owner) {
            revert NotIsOwner();
        }

        (bool sucess, ) = owner.call{ value: address(this).balance }("");
        require(sucess);
    }
}