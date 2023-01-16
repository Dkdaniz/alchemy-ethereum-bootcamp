const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should create four foods', async () => {
        for(let i = 1; i <= 4; i++) {
            const food = await contract.callStatic[`food${i}`]();
            assert.isAtLeast(food, 0);
        }
    });
});