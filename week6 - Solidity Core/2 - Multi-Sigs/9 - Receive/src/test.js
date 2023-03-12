const { assert } = require('chai');
describe('MultiSig', function () {
    let contract;
    let accounts;
    let _required = 2;
    describe('Fallback Tests', function () {
        beforeEach(async () => {
            accounts = await ethers.provider.listAccounts();
            const MultiSig = await ethers.getContractFactory("MultiSig");
            contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
            await contract.deployed();
        });

        it('should accept funds', async function () {
            const value = ethers.utils.parseEther("1");
            await ethers.provider.getSigner(accounts[1]).sendTransaction({ to: contract.address, value });
            const balance = await ethers.provider.getBalance(contract.address);
            assert.equal(balance.toString(), value.toString());
        });
    });
});