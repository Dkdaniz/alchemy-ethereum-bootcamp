const { assert } = require('chai');
const deposit = ethers.utils.parseEther("1");
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
            { value: deposit }
        );
        await contract.deployed();
    });

    it('should be funded', async () => {
        let balance = await ethers.provider.getBalance(contract.address);
        assert.equal(balance.toString(), deposit.toString());
    });

    it('should set an arbiter', async () => {
        const _arbiter = await contract.arbiter.call();
        assert.equal(_arbiter, accounts.arbiter.address);
    });

    it('should set a depositor', async () => {
        const _depositor = await contract.depositor.call();
        assert.equal(_depositor, accounts.depositor.address);
    });

    it('should set a beneficiary', async () => {
        const _beneficiary = await contract.beneficiary.call();
        assert.equal(_beneficiary, accounts.beneficiary.address);
    });
});