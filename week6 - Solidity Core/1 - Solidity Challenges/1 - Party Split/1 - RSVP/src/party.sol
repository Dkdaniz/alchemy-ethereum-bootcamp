// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint256 amount;

    struct Participant {
        address account;
    }

    Participant[] participants;

	constructor(uint256 _amount){
        amount = _amount;
    }

    function rsvp() external payable {
        require(_isParticipant() == false, "participant already registred");
        require(msg.value == amount, "value no is valid");
        participants.push(Participant(msg.sender));
    }

    function _isParticipant() internal view returns (bool) {
        uint participantsLength = participants.length;
        for(uint256 i = 0; i < participantsLength; i++){
            if(participants[i].account == msg.sender){
                return true;
            }
        }

        return false;
    }
}