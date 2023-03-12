const { assert } = require('chai');
describe('MultiSig', function () {
    let contract;
    let accounts;
    let _required = 2;
    beforeEach(async () => {
        accounts = await ethers.provider.listAccounts();
        const MultiSig = await ethers.getContractFactory("MultiSig");
        contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
        await contract.deployed();
    });

    describe('after creating the first transaction', function () {
        beforeEach(async () => {
            await contract.addTransaction(accounts[1], 100);
            await contract.confirmTransaction(0);
        });

        it('should confirm the transaction', async function () {
            let confirmed = await contract.callStatic.getConfirmationsCount(0);
            assert.equal(confirmed, 1);
        });

        describe('after creating the second transaction', function () {
            beforeEach(async () => {
                await contract.addTransaction(accounts[1], 100);
                await contract.confirmTransaction(1);
                await contract.connect(ethers.provider.getSigner(accounts[1])).confirmTransaction(1);
            });

            it('should confirm the transaction twice', async function () {
                let confirmed = await contract.callStatic.getConfirmationsCount(1);
                assert.equal(confirmed, 2);
            });
        });
    });
});