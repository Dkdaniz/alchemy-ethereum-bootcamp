const { assert } = require('chai');
describe('MultiSig', function () {
    let contract;
    let _required = 2;
    let accounts;
    let beforeBalance, signer1;
    beforeEach(async () => {
        accounts = await ethers.provider.listAccounts();
        const MultiSig = await ethers.getContractFactory("MultiSig");
        contract = await MultiSig.deploy(accounts.slice(0, 3), _required);
        await contract.deployed();

        signer1 = ethers.provider.getSigner(accounts[1]);
        beforeBalance = await ethers.provider.getBalance(accounts[2]);
    });

    describe("after depositing and submitting a transaction", () => {
        const transferAmount = ethers.utils.parseEther("0.5");
        beforeEach(async () => {
            await signer1.sendTransaction({ to: contract.address, value: transferAmount.mul(2) });
            await contract.submitTransaction(accounts[2], transferAmount);
        });

        it('should not execute transaction yet', async () => {
            const txn = await contract.callStatic.transactions(0);
            assert(!txn.executed);
        });

        it('should not update the beneficiary balance', async () => {
            const afterBalance = await ethers.provider.getBalance(accounts[2]);
            assert.equal(afterBalance.toString(), beforeBalance.toString());
        });

        describe('after confirming', () => {
            beforeEach(async () => {
                await contract.connect(signer1).confirmTransaction(0);
            });

            it('should try to execute transaction after confirming', async () => {
                const txn = await contract.callStatic.transactions(0);
                assert(txn.executed);
            });

            it('should update the beneficiary balance', async () => {
                const afterBalance = await ethers.provider.getBalance(accounts[2]);
                assert.equal(afterBalance.sub(beforeBalance).toString(), transferAmount.toString());
            });
        });
    });
});