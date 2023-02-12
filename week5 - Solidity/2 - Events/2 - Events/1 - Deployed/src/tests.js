const { assert } = require('chai');
describe('Collectible', function () {
    let deployedEvent;
    before(async () => {
        const Collectible = await ethers.getContractFactory('Collectible');
        const collectible = await Collectible.deploy();
        const receipt = await collectible.deployTransaction.wait();
        // get the topic for this escrow contract's Deployed event
        const topic = collectible.interface.getEventTopic('Deployed');
        const log = receipt.logs.find(x => x.topics.indexOf(topic) >= 0);
        deployedEvent = collectible.interface.parseLog(log);
    });

    it('should have emitted a deployed event', async () => {
        assert(deployedEvent, "Expected a Deployed event to be emitted!");
        assert.equal(deployedEvent.args.length, 1, "Only expected 1 event value to be emitted!");
        const [owner] = await ethers.provider.listAccounts();
        assert.equal(deployedEvent.args[0], owner);
    });
});