const { assert } = require('chai')
describe('Contract', function () {
    let contract;
    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should return the filtered numbers', async () => {
        const result = await contract.filterEven([1, 2, 1, 4, 1]);
        assert.sameMembers(result.map(x => Number(x)), [2, 4]);

        const result2 = await contract.filterEven([1, 1, 2, 10, 2]);
        assert.sameMembers(result2.map(x => Number(x)), [2, 10, 2]);
    });
});