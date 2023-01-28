const { assert } = require('chai');
const setMessage = require('./index');

describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should set the value', async () => {
        await setMessage(contract, ethers.provider.getSigner(1));
        const message = await contract.message();
        assert.notEqual(message, "", "Expecting message to be modified. Still set to an empty string!");
    });
});
