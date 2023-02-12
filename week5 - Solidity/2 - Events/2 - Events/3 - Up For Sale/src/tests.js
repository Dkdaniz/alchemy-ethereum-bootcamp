const { assert, expect } = require('chai');
const chai = require('chai');

describe('Collectible', function () {
    let deployedEvent, oneEther, collectible, response, blockNumber;
    before(async () => {
        const Collectible = await ethers.getContractFactory('Collectible');
        collectible = await Collectible.deploy();
        oneEther = ethers.utils.parseEther("1.0");
        response = await collectible.markPrice(oneEther);
        const receipt = await response.wait();
        blockNumber = response.blockNumber;

        const topic = collectible.interface.getEventTopic('ForSale');
        const log = receipt.logs.find(x => x.topics.indexOf(topic) >= 0);
        deployedEvent = collectible.interface.parseLog(log);
    });

    it('should revert if a non-owner tries to mark the price', async () => {
        let [owner, a2] = await ethers.provider.listAccounts();
        const signer = await ethers.provider.getSigner(a2);
        await expect(collectible.connect(signer).markPrice(oneEther)).to.be.reverted;
    });

    it('should emit a ForSale event', async () => {
        let block = await ethers.provider.getBlock(blockNumber);
        let blockTimeStamp = block.timestamp;
        assert(deployedEvent, "Expected a ForSale event to be emitted!");
        assert.equal(deployedEvent.args.length, 2, "Expected 2 event values to be emitted!");
        assert.equal(deployedEvent.args[0].toHexString(16), oneEther.toHexString(16), "Expected the first return value to be the price.");
        assert.equal(deployedEvent.args[1].toNumber(), blockTimeStamp, "Expected the second return value to be the block timestamp.");
    });
});