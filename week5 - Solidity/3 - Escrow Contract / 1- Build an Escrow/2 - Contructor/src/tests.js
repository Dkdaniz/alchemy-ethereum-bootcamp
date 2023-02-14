const { assert } = require('chai');
describe('Escrow', function () {
    let contract;
    let accounts = {};
    before(async () => {
        const roles = ['arbiter', 'beneficiary', 'depositor'];
        for (let i = 0; i < roles.length; i++) {
            const signer = ethers.provider.getSigner(i);
            const address = await signer.getAddress();
            accounts[roles[i]] = { signer, address }
        }

        const Contract = await ethers.getContractFactory("Escrow");
        contract = await Contract.connect(accounts.depositor.signer).deploy(
            accounts.arbiter.address,
            accounts.beneficiary.address,
        );
        await contract.deployed();
    });

    it('should set an arbiter', async () => {
        const _arbiter = await contract.callStatic.arbiter();
        assert.equal(_arbiter, accounts.arbiter.address);
    });

    it('should set a depositor', async () => {
        const _depositor = await contract.callStatic.depositor();
        assert.equal(_depositor, accounts.depositor.address);
    });

    it('should set a beneficiary', async () => {
        const _beneficiary = await contract.callStatic.beneficiary();
        assert.equal(_beneficiary, accounts.beneficiary.address);
    });
});