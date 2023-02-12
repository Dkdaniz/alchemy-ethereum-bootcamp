const { assert, expect } = require('chai');
const chai = require('chai');

describe('Collectible', function () {
    let deployedEvent, response, collectible, owner, a2;
    before(async () => {
        [owner, a2] = await ethers.provider.listAccounts();
        const Collectible = await ethers.getContractFactory("Collectible");
        collectible = await Collectible.deploy();
        response = await collectible.transfer(a2);

        const receipt = await response.wait();
        const topic = collectible.interface.getEventTopic('Transfer');
        const log = receipt.logs.find(x => x.topics.indexOf(topic) >= 0);
        deployedEvent = collectible.interface.parseLog(log);
    });

    it('should emit a Transfer event', async () => {
        assert(deployedEvent, "Expected a Transfer event to be emitted!");
        assert.equal(deployedEvent.args.length, 2, "Expected 2 event values to be emitted!");
        assert.equal(deployedEvent.args[0], owner, "Expected the first return value to be the original owner address.");
        assert.equal(deployedEvent.args[1], a2, "Expected the second return value to be the new owner address.");
    });

    it('should revert if the original owner tries to transfer again', async () => {
        const signer = await ethers.provider.getSigner(owner);
        await expect(collectible.connect(signer).transfer(a2)).to.be.reverted;
    });
});