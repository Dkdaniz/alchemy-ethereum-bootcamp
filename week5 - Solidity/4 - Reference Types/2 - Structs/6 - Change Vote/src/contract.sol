// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
	enum Choices { Yes, No }
	
	struct Vote {
		Choices choice;
		address voter;
	}

	Vote[] public votes;
	
	function findVote(address _voter) public view returns (Vote memory){
		for(uint256 i = 0; i < votes.length; i++){
			if(votes[i].voter == _voter){
				return votes[i];
			}
		}

		return Vote(Choices(1),address(0));
	}

	function createVote(Choices choice) external {
		Vote memory vote = findVote(msg.sender);
		
		if(vote.voter != address(0)) revert("This address has already voted");

		votes.push(Vote(choice, msg.sender));
	}

	function hasVoted(address _voter) external view returns (bool){
		Vote memory vote = findVote(_voter);

		if(vote.voter == address(0)) return false; 

		return true; 
	}

	function findChoice(address _voter) external view returns (Choices){
		Vote memory vote = findVote(_voter);

		if(vote.voter == address(0)) return Choices(1); 
		return vote.choice;
	}

	function changeVote(Choices _newChoice) public {
		bool isVoterValid = false;
		for(uint256 i = 0; i < votes.length; i++){
			if(votes[i].voter == msg.sender){
				votes[i].choice = _newChoice;
				isVoterValid = true;
			}
		}

		if(isVoterValid == false) revert("This address cannot change a non-existing vote.");
	}
}