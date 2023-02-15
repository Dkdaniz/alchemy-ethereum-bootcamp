// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    address[] members;

    function addMember(address _newMember) external {
        members.push(_newMember);
    }

    function isMember(address _member) public view returns(bool){
        for(uint256 i = 0; i < members.length; i++) {
            if(members[i] == _member){
                return true;
            }
        }

        return false;
    }
}