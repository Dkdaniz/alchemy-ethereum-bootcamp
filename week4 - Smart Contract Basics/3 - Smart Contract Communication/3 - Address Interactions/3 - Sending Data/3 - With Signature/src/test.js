const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Contracts2", () => {
    let hero, sidekick;
    before(async () => {
        const Hero = await ethers.getContractFactory("Hero");
        hero = await Hero.deploy();

        const Sidekick = await ethers.getContractFactory("Sidekick");
        sidekick = await Sidekick.deploy();
    });

    describe("after sending the alert", () => {
        before(async () => {
            await sidekick.sendAlert(hero.address, 5, true);
        });

        it("should have the sidekick alert the hero", async () => {
            const ambush = await hero.ambush();

            assert(ambush.alerted);
            assert.equal(ambush.enemies, 5);
            assert.equal(ambush.armed, true);
        });
    });
});
