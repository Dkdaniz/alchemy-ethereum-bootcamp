# Virtual & Override

It's time to introduce two new function keywords: **`virtual`** and **`override`**.

Sometimes we'll want to leave a function on a base contract open to re-implementation by its derived class. That's where these two new keywords come in. The **`virtual`** keyword allows us to specify a function on a contract that can be overridden using the **`override`** keyword.

```solidity
contract Base {
	uint public value = 5;
	// this method can be overridden 
	function increaseValue() virtual external {
		value += 10;
	}
}

contract Derived is Base {
	// this method overrides the virtual method
	function increaseValue() override external {
		value *= 2;
	}
}
```

☝️ In this case, both `Derived` and `Base` have different function bodies for `increaseValue`.

The `Derived` contract will use its own implementation of increaseValue, which overrides the virtual function implemented in `Base`.

> ⚠️ The overriding function must have the same visibility as the virtual function. If not the compiler will throw a TypeError: "Overriding function visibility differs". Keep en eye out for that one!

We can also specify **`abstract`** contracts where virtual functions do not require an implementation. However, these functions must be implemented at some point by a derived contract.

🔍 Let's take a closer look at abstract functions in details.

## 🏁 Your Goal: SuperHero Attacks

You'll notice the `Hero.sol` tab has changed once again! This time there's three important things to notice:

1. The `Hero` contract is an abstract contract. It has a `virtual` function called `attack` which we'll need to override in both Warrior and Mage.
2. An `enum` called `AttackTypes` has been added to the Hero contract to differentiate between the different types of attacks our heroes can do.
3. An interface for an `Enemy` has been added which we import to invoke the `takeAttack` function on an enemy contract address.
   
Your job is to implement the `attack` function on the Warrior and Mage contracts:

1. Add an `override` function called `attack` to both the Warrior and Mage contracts. This function should take an address parameter which will be the address for an Enemy contract (note: you'll need to instantiate the enemy contract)
2. Use the Enemy interface to invoke the `takeAttack` function on the enemy contract at this address.
3. For the Warrior, invoke the enemy's `takeAttack` with the `Brawl` attack type. ⚔️
4. For the Mage, invoke the enemy's `takeAttack` with the `Spell` attack type. 🔮

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
