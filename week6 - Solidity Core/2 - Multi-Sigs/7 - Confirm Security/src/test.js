const { assert } = require('chai');
describe('MultiSig', function () {
    let contract;
    let accounts;
    let _required = 2;
    before(async () => {
        accounts = await ethers.provider.listAccounts();
        const MultiSig = await ethers.getContractFactory("MultiSig");
        contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
        await contract.deployed();
    });

    describe('Confirm Transaction Tests', function () {
        beforeEach(async () => {
            await contract.addTransaction(accounts[1], 100);
        });

        describe('from an invalid address', () => {
            it('should throw an error', async function () {
                await expectThrow(
                    contract.connect(ethers.provider.getSigner(accounts[3])).confirmTransaction(0)
                );
            });
        });

        describe('from a valid owner address', () => {
            it('should not throw an error', async function () {
                await contract.connect(ethers.provider.getSigner(accounts[2])).confirmTransaction(0);
                assert(true);
            });
        });
    });
});

async function expectThrow(promise) {
    const errMsg = 'Expected throw not received';
    try {
        await promise;
    } catch (err) {
        return;
    }
    assert(false, errMsg);
}