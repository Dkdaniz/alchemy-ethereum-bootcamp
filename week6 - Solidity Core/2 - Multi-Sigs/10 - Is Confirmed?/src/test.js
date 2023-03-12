const { assert } = require('chai');
describe('MultiSig', function () {
    let contract;
    let accounts;
    let _required = 2;

    describe('Confirmed Tests', function () {
        beforeEach(async () => {
            accounts = await ethers.provider.listAccounts();
            const MultiSig = await ethers.getContractFactory("MultiSig");
            contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
            await contract.deployed();
        });

        it('should return true if the required threshold is met for a transaction', async function () {
            await contract.submitTransaction(accounts[1], 100);

            await contract.connect(ethers.provider.getSigner(accounts[1])).confirmTransaction(0);
            const confirmed = await contract.callStatic.isConfirmed(0);

            assert.equal(confirmed, true);
        });

        it('should return false if the required threshold is not met for a transaction', async function () {
            await contract.submitTransaction(accounts[1], 100);

            let confirmed = await contract.callStatic.isConfirmed(0);

            assert.equal(confirmed, false);
        });
    });
});