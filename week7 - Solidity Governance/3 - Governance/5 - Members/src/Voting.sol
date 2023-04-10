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
    address[] public members;

    mapping(address => mapping(uint256 => bool)) _voters;

    event ProposalCreated(uint256 _proposalId);
    event VoteCast(uint256 _proposalId, address indexed _voter);

    constructor(address[] memory _members) {
        for(uint256 i = 0; i < _members.length; i++){
            members.push(_members[i]);
        }

        members.push(msg.sender);
    }

    modifier onlyMember(){
        bool isMember = false;

        for(uint256 i = 0; i < members.length; i++){
            if(members[i] == msg.sender){
                isMember = true;
            }
        }

        require(isMember == true, "address no is a member");

        _;
    }

    function newProposal(address _target, bytes calldata _data) onlyMember external {
        proposals.push(Proposal(_target, _data, 0, 0));
        emit ProposalCreated(proposals.length - 1);
    }

    function castVote(uint256 _proposalId, bool _supportProposal) onlyMember external {
        if(_voters[msg.sender][_proposalId] == false){
            _voters[msg.sender][_proposalId] = true;
            _newVote(_proposalId, _supportProposal);
        }else{
            _updateVote(_proposalId, _supportProposal);
        }

        emit VoteCast(_proposalId, msg.sender);
    }

    function _newVote(uint256 _proposalId, bool _supportProposal) internal {
        if(_supportProposal == true){
            proposals[_proposalId].yesCount++;
        }else{
            proposals[_proposalId].noCount++;
        }
    }

    function _updateVote(uint256 _proposalId, bool _supportProposal) internal {
        if(_supportProposal == true){
            if(proposals[_proposalId].noCount > 0){
                proposals[_proposalId].yesCount++;
                proposals[_proposalId].noCount--;
            }
        }else{
            if(proposals[_proposalId].yesCount > 0){
                proposals[_proposalId].yesCount--;
                proposals[_proposalId].noCount++;
            }
        }
    }
}
