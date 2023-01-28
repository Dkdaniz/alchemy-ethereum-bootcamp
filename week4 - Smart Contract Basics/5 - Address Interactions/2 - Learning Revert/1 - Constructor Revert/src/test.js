const { assert } = require('chai');
describe('Contract', function () {
    it('should not create a contract with a .5 ether deposit', async () => {
        let ex;
        try {
            const Contract = await ethers.getContractFactory("Contract");
            const contract = await Contract.deploy({ value: ethers.utils.parseEther(".5") });
            await contract.deployed();
        }
        catch (_ex) { ex = _ex; }
        if (!ex) {
            assert.fail("Contract was created with a .5 ether deposit");
        }
    });

    it('should create a contract with a 1 ether deposit', async () => {
        const Contract = await ethers.getContractFactory("Contract");
        const contract = await Contract.deploy({ value: ethers.utils.parseEther("1") });
        await contract.deployed();
    });

    it('should create a contract with a 2 ether deposit', async () => {
        const Contract = await ethers.getContractFactory("Contract");
        const contract = await Contract.deploy({ value: ethers.utils.parseEther("2") });
        await contract.deployed();
    });
});