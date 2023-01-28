const { assert } = require("chai");
describe('Sidekick', function () {
    let sidekick, hero;
    beforeEach(async () => {
        const Sidekick = await ethers.getContractFactory("Sidekick");
        sidekick = await Sidekick.deploy();

        const Hero = await ethers.getContractFactory("Hero");
        hero = await Hero.deploy();

        await sidekick.sendAlert(hero.address);
    });

    it('should have alerted the hero', async () => {
        const alerted = await hero.alerted.call();
        assert.equal(alerted, true);
    });
});
