const { assert } = require('chai');
describe('Escrow', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Escrow");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should declare an arbiter', () => {
        assert(contract.arbiter, "Did not find an arbiter!");
    });

    it('should declare an depositor', () => {
        assert(contract.depositor, "Did not find a depositor");
    });

    it('should declare an beneficiary', () => {
        assert(contract.beneficiary, "Did not find a beneficiary!");
    });
});