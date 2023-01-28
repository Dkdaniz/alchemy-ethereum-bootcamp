// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hero {
    Ambush public ambush;

    struct Ambush {
        bool alerted;
        uint enemies;
        bool armed;
    }

    uint public lastContact;

    function alert(uint enemies, bool armed) external {
        ambush = Ambush(true, enemies, armed);
    }
    
    fallback() external {
        lastContact = block.timestamp;
    }
}