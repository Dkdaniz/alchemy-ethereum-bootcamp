const { assert } = require('chai');
const deposit = require('./index');

describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should deposit at least 1 ether', async () => {
        await deposit(contract);
        const balance = await ethers.provider.getBalance(contract.address);
        assert(balance.gte(ethers.utils.parseEther("1")));
    });
});
