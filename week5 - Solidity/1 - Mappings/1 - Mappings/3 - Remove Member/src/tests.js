const { assert } = require('chai');
describe('Contract', function () {
    let members;
    let nonMember;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();

        const accounts = await ethers.provider.listAccounts();
        members = accounts.slice(0, 2);
        nonMember = accounts[2];
    });

    describe('adding a couple members', () => {
        before(async () => {
            for (let i = 0; i < members.length; i++) {
                await contract.addMember(members[i]);
            }
        });

        it('should find added members', async () => {
            for (let i = 0; i < members.length; i++) {
                assert(await contract.callStatic.isMember(members[i]));
            }
        });

        it('should not find a non-added member', async () => {
            assert(!(await contract.callStatic.isMember(nonMember)));
        });

        describe('after removing a member', () => {
            before(async () => {
                await contract.removeMember(members[0]);
            });

            it('should not find that member', async () => {
                assert(!(await contract.callStatic.isMember(members[0])));
            });

            it('should still find the other member', async () => {
                assert(await contract.callStatic.isMember(members[1]));
            });
        });
    });
});