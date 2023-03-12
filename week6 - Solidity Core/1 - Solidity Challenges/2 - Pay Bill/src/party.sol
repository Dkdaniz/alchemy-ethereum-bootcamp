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

    function payBill(address payable _venue, uint256 _amount) external payable {
        _venue.transfer(_amount);

        uint256 participantsLength = participants.length;
        uint256 totalBalanceContract = address(this).balance;
        uint256 valuePerParticipant = totalBalanceContract / participantsLength;
        
        for(uint256 i = 0; i < participantsLength; i++){
            payable(participants[i].account).transfer(valuePerParticipant);
        }
    }

    function _isParticipant() internal view returns (bool) {
        uint256 participantsLength = participants.length;
        for(uint256 i = 0; i < participantsLength; i++){
            if(participants[i].account == msg.sender){
                return true;
            }
        }

        return false;
    }
}