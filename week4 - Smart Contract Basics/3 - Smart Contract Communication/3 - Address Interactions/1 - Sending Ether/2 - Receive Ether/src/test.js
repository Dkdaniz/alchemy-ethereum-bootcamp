const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    let value = ethers.utils.parseEther("1");
    let owner;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
        
        owner = ethers.provider.getSigner(0);
        await owner.sendTransaction({ to: contract.address, value });
    });

    it('should store the owner', async () => {
        const _owner = await contract.owner.call();
        assert.equal(_owner, await owner.getAddress());
    });

    it('should receive the ether', async () => {
        const balance = await ethers.provider.getBalance(contract.address);
        assert(balance.eq(value), "expected the ether to be received");
    });
});