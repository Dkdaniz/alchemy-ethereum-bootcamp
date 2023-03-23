// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";

contract Chest {
    function plunder(address[] memory _tokensAddress) external {
        uint256 lengthTokensAddress = _tokensAddress.length;

        require(_tokensAddress.length > 0, "contract address invalid");

        for(uint256 i; i < lengthTokensAddress; i++){
            require(_tokensAddress[i] != address(0), "contract address invalid");
            IERC20 token = IERC20(_tokensAddress[i]);

            uint256 balance = token.balanceOf(address(this));

            token.transfer(msg.sender, balance);
        }
    }
}
