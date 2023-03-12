// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;

    struct Transaction {
        address destination;
        uint256 amount;
        bool executed;
    }

    Transaction[] public transactions;

    mapping(uint256 => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint256 _required ){
        uint256 ownersLength = _owners.length;
        
        require(ownersLength > 0, "number of owners cannot be zero");
        require(_required > 0, "_required cannot be zero");
        require(_required < ownersLength, "required cannot be more than the total of owners");
        
        required = _required;
        owners = _owners;
    }

    function transactionCount() external view returns (uint256) {
        return transactions.length;
    }

    function confirmTransaction(uint256 _trasanctionId) public {
        require(_isOwner() == true, "only owners can call this method");
        confirmations[_trasanctionId][msg.sender] = true;
    }

    function getConfirmationsCount(uint256 _trasanctionId) public view returns(uint256){
        uint256 ownersLength = owners.length;
        uint256 countConfirmation;
        for(uint256 i = 0; i < ownersLength; i++){
            if(confirmations[_trasanctionId][owners[i]] == true){
                countConfirmation++;
            }
        }

        return countConfirmation;
    }

    function submitTransaction(address _destination, uint256 _amount) external {
        uint256 transactionId = _addTransaction(_destination, _amount);
        confirmTransaction(transactionId);
    }

    function isConfirmed(uint256 _trasanctionId) public view returns (bool) {
        uint256 confirmationsTransaction = getConfirmationsCount(_trasanctionId);
        return confirmationsTransaction >= required;
    }

    function executeTransaction(uint256 _trasanctionId) external {
        Transaction storage _tx = transactions[_trasanctionId];

        require(_tx.executed == false, "transaction already was executed");
        require(isConfirmed(_trasanctionId) == true, "only transaction confirmed can be executed");

        (bool success, ) = _tx.destination.call{ value: _tx.amount }("");
        require(success, "Failed to execute transaction");

        transactions[_trasanctionId].executed = true;
    }

    receive() external payable {}

    function _addTransaction(address _destination, uint256 _amount) internal returns (uint256) {
        require(_destination != address(0), "address invalid");
        require(_amount > 0, "amount invalid");

        transactions.push(Transaction(_destination, _amount, false));
        uint256 transactionId = transactions.length - 1;

        return transactionId;
    }

    function _isOwner() internal view returns (bool) {
        uint256 ownersLength = owners.length;
        for(uint256 i = 0; i < ownersLength; i++){
            if(owners[i] == msg.sender){
                return true;
            }
        }

        return false;
    }
}
