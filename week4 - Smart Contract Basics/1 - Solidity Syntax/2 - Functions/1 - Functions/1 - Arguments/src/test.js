const { assert } = require('chai');
const num = Math.floor(Math.random() * 1000); 
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy(num);
        await contract.deployed();
    });

    it('should create variable x with the number stored in it', async () => {
        const x = await contract.callStatic.x();
        assert.equal(x, num);
    });
});