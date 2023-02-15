// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    address[] members;

    constructor(){
        members.push(msg.sender);
    }

    function isMember(address _member) public view returns(bool){
        for(uint256 i = 0; i < members.length; i++) {
            if(members[i] == _member){
                return true;
            }
        }

        return false;
    }

    function addMember(address _newMember) external {
        require(isMember(msg.sender), "only member can add a new member");
        members.push(_newMember);
    }

    function removeLastMember() external {
        members.pop();
    }
}