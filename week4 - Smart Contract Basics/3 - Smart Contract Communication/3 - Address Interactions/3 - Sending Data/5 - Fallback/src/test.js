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
            await sidekick.makeContact(hero.address);
        });

        it("should update the last contract", async () => {
            const lastContact = await hero.lastContact();

            assert.notEqual(lastContact.toNumber(), 0);
        });
    });
});
