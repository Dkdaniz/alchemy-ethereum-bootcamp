const { assert } = require('chai')
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should return the sum', async () => {
        assert.equal(await contract.sum([1, 1, 1, 1, 1]), 5);
        assert.equal(await contract.sum([1, 2, 3, 4, 5]), 15);
    });
});