const { assert } = require("chai");

describe('Sidekick', function () {
    let sidekick, hero;
    beforeEach(async () => {
        const Sidekick = await ethers.getContractFactory("Sidekick");
        sidekick = await Sidekick.deploy();

        const Hero = await ethers.getContractFactory("Hero");
        hero = await Hero.deploy();

        const calldata = hero.interface.encodeFunctionData('alert', [5, true]);
        await sidekick.relay(hero.address, calldata);
    });

    it("should have the sidekick alert the hero", async () => {
        const ambush = await hero.ambush();

        assert(ambush.alerted);
        assert.equal(ambush.enemies, 5);
        assert.equal(ambush.armed, true);
    });
});
