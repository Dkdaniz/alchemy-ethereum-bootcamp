const { assert } = require('chai');
describe('Hero', function () {
    let warrior;
    let mage;
    before(async () => {
        const Warrior = await ethers.getContractFactory("Warrior");
        warrior = await Warrior.deploy();
        await warrior.deployed();

        const Mage = await ethers.getContractFactory("Mage");
        mage = await Mage.deploy();
        await mage.deployed();
    });

    describe('Warrior', () => {
        it('should have 100 health initially', async () => {
            const health = await warrior.health();
            assert.equal(health.toNumber(), 100);
        });

        it('should take damage', async () => {
            await warrior.takeDamage(10);
            const health = await warrior.health();
            assert.equal(health.toNumber(), 90);
        });
    });

    describe('Mage', () => {
        it('should have 100 health initially', async () => {
            const health = await mage.health();
            assert.equal(health.toNumber(), 100);
        });

        it('should take damage', async () => {
            await mage.takeDamage(10);
            const health = await mage.health();
            assert.equal(health.toNumber(), 90);
        });
    });
});