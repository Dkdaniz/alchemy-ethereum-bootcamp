// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
    }

    Proposal[] public proposals;

    function newProposal(address _target, bytes calldata _data) external {
        proposals.push(Proposal(_target, _data, 0, 0));
    }

    function castVote(uint256 _proposalId, bool _supportProposal) external {
        if(_supportProposal == true){
            proposals[_proposalId].yesCount++;
        }else{
            proposals[_proposalId].noCount++;
        }
    }
}
