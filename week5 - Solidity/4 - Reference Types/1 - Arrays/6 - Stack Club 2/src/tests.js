const { assert } = require('chai')
describe('Contract', function () {
    let contract;
    let accounts;
    let owner;
    beforeEach(async () => {
        const StackClub = await ethers.getContractFactory("StackClub");
        contract = await StackClub.deploy();
        await contract.deployed();

        owner = ethers.provider.getSigner(0);
        accounts = (await ethers.provider.listAccounts()).slice(1)
    });

    it('should not allow a non-member to add a member', async () => {
        await assertRevert(
            contract.connect(accounts[0]).addMember(accounts[0]),
            "A member should not be allowed to add a member. Expected the transaction to revert!"
        );
    });

    it('should not allow a non-member to remove last member', async () => {
        await assertRevert(
            contract.connect(accounts[0]).removeLastMember(),
            "A member should not be allowed to remove last member. Expected the transaction to revert!"
        );
    });

    describe('after adding a few members', () => {
        beforeEach(async () => {
            for (let i = 0; i < 3; i++) {
                await contract.connect(owner).addMember(accounts[i]);
            }
        });

        it('should detect members', async () => {
            for (let i = 0; i < 3; i++) {
                assert(await contract.isMember(accounts[i]));
            }
        });

        it('should detect non-members', async () => {
            for (let i = 3; i < 6; i++) {
                assert(!(await contract.isMember(accounts[i])));
            }
        });

        describe('after calling removeLastMember as a member', () => {
            beforeEach(async () => {
                const signer = ethers.provider.getSigner(accounts[1]);
                await contract.connect(signer).removeLastMember();
            });

            it("It should pop off the most recent club member", async () => {
                assert(!(await contract.isMember(accounts[2])), "expected the most recently added member to be removed");
            });

            describe('after calling removeLastMember twice', () => {
                beforeEach(async () => {
                    const signer = ethers.provider.getSigner(accounts[1]);
                    await contract.connect(signer).removeLastMember();
                });

                it("It should pop off the most recent club member", async () => {
                    assert(!(await contract.isMember(accounts[1])), "expected the most recently added member to be removed");
                });
            });
        });
    });
});

async function assertRevert(promise, msg) {
    let ex;
    try {
        await promise;
    }
    catch (_ex) {
        ex = _ex;
    }
    assert(ex, msg);
}