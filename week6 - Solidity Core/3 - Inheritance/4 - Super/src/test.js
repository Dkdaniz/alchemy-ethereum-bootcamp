const { assert } = require('chai');
const ATTACK_TYPES = {
    BRAWL: 0,
    SPELL: 1,
}
describe('Hero', function () {
    let warrior;
    let mage;
    let Enemy;
    before(async () => {
        Enemy = await ethers.getContractFactory("EnemyContract");

        const Warrior = await ethers.getContractFactory("Warrior");
        warrior = await Warrior.deploy();
        await warrior.deployed();

        const Mage = await ethers.getContractFactory("Mage");
        mage = await Mage.deploy();
        await mage.deployed();
    });

    describe('Warrior', () => {
        let enemy;
        let receipt;
        before(async () => {
            enemy = await Enemy.deploy();
            await enemy.deployed();

            const tx = await warrior.attack(enemy.address);
            receipt = await tx.wait();
        });

        it('should attack the enemy with a brawl type attack', async () => {
            const topic = Enemy.interface.getEventTopic("Attacked");
            const log = receipt.logs.find(x => x.topics[0] === topic);
            assert(log, "Expected the enemy to take an attack! Attack not registered on the enemy.");
            assert.equal(Number(log.data), ATTACK_TYPES.BRAWL, "Expected the attack from warrior to be of AttackType Brawl");
        });

        it('should use some energy', async () => {
            const energy = await warrior.energy();
            assert.equal(energy, 9);
        });
    });

    describe('Mage', () => {
        let enemy;
        let receipt;
        before(async () => {
            enemy = await Enemy.deploy();
            await enemy.deployed();

            const tx = await mage.attack(enemy.address);
            receipt = await tx.wait();
        });

        it('should attack the enemy with a spell type attack', async () => {
            const topic = Enemy.interface.getEventTopic("Attacked");
            const log = receipt.logs.find(x => x.topics[0] === topic);
            assert(log, "Expected the enemy to take an attack! Attack not registered on the enemy.");
            assert.equal(Number(log.data), ATTACK_TYPES.SPELL, "Expected the attack from mage to be of AttackType Spell");
        });

        it('should use some energy', async () => {
            const energy = await mage.energy();
            assert.equal(energy, 9);
        });
    });
});