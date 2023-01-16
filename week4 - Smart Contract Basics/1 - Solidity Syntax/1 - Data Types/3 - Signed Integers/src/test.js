const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should create two variables, one positive and one negative', async () => {
        const a = await contract.callStatic.a();
        const b = await contract.callStatic.b();
        const aPositive = a > 0 && b < 0;
        const bPositive = b > 0 && a < 0;
        assert(aPositive || bPositive, "Declare variables a and b where one is positive (above zero) and the other is negative (below zero)");
    });

    it('should find the absolute difference between the two variables', async () => {
        const a = await contract.callStatic.a();
        const b = await contract.callStatic.b();
        const difference = await contract.callStatic.difference();
        assert.equal(difference, Math.abs(a - b));
    });
});