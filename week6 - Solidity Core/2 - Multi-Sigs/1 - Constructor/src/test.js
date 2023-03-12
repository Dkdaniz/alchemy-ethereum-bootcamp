const { assert } = require('chai');
describe('MultiSig', function () {
    let contract;
    let _required = 2;
    before(async () => {
        accounts = await ethers.provider.listAccounts();
        const MultiSig = await ethers.getContractFactory("MultiSig");
        contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
        await contract.deployed();
    });

    it('should set an array of owners', async function () {
        let firstOwner = await contract.callStatic.owners(0);
        let lastOwner = await contract.callStatic.owners(2);
        assert.equal(accounts[2], lastOwner);
        assert.equal(accounts[0], firstOwner);
    });

    it('should set the number of required confirmations', async function () {
        const required = await contract.required();
        assert.equal(_required, required);
    });
});