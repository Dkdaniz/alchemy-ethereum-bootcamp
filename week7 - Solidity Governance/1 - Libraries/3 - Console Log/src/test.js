const { assert } = require('chai');
const { secretMessage, secretResponse } = require('./secret');

describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should create variable a: true', async () => {
        const response = await contract.callStatic.getSecret(secretMessage);
        assert(response.toNumber() === secretResponse, "Did not return the secret response :(");
    });
});