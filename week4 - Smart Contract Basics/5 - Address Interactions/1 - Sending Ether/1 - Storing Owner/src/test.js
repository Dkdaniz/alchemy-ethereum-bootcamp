const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should store the owner', async () => {
        const _owner = await contract.owner.call();
        const [owner] = await ethers.provider.listAccounts();
        assert.equal(_owner, owner);
    });
});