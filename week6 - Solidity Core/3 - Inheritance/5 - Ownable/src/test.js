const { assert } = require('chai');
describe('Collectible', function () {
    let contract;
    before(async () => {
        const Collectible = await ethers.getContractFactory("Collectible");
        contract = await Collectible.deploy();
        await contract.deployed();
    });

    it('should allow the owner to mark the price', async () => {
        await contract.markPrice(5);
        const val = await contract.callStatic.price();
        assert.equal(val, 5);
    });

    it('should throw if someone else tries to change the variable', async () => {
        let ex;
        try {
            await contract.connect(ethers.provider.getSigner(1)).markPrice(5);
        }
        catch (_ex) {
            ex = _ex;
        }
        assert(ex, "Expected it to revert");
    });
});