// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Hero.sol";

contract Mage is Hero(50) {
    function attack(address enemy) override public{
        Enemy(enemy).takeAttack(AttackTypes(1));
        super.attack(enemy);
    }
}

contract Warrior is Hero(200) {
    function attack(address enemy) virtual override public  {
        Enemy(enemy).takeAttack(AttackTypes(0));
        super.attack(enemy);
    }
}