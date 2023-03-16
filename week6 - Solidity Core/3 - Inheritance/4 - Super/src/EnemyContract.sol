// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract EnemyContract {
	enum AttackTypes { Brawl, Spell }
	
	event Attacked (AttackTypes attackTypes);

	function takeAttack(AttackTypes _attackType) public virtual {
		emit Attacked(_attackType);
	}
} 