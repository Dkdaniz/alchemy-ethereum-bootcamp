const { assert } = require('chai');
const setValue = require('./index');

describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should set the value', async () => {
        await setValue(contract);
        const value = await contract.value();
        assert(value.gt(0), "Expecting value to be modified. Still set at 0!");
    });
});
