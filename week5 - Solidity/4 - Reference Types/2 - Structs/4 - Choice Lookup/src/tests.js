const { assert } = require('chai');
const CHOICES = {
    YES: 0,
    NO: 1,
}
describe('Contract', function () {
    let contract;
    let accounts;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();

        accounts = (await ethers.provider.listAccounts()).map((address) => ({
            address,
            signer: ethers.provider.getSigner(address)
        }));
    });

    describe('after voting yes', () => {
        before(async () => {
            await contract.connect(accounts[0].signer).createVote(CHOICES.YES);
        });

        it('should return true for this address having voted', async () => {
            assert(await contract.hasVoted(accounts[0].address));
        });

        it('should find a choice for the address', async () => {
            const choice = await contract.findChoice(accounts[0].address);
            assert.equal(choice, CHOICES.YES);
        });

        it('should not return true for a different address having voted', async () => {
            assert(!(await contract.hasVoted(accounts[1].address)));
        });
    });

    describe('after voting no', () => {
        before(async () => {
            await contract.connect(accounts[1].signer).createVote(CHOICES.NO);
        });

        it('should return true for this address having voted', async () => {
            assert(await contract.hasVoted(accounts[1].address));
        });

        it('should find a choice for the address', async () => {
            const choice = await contract.findChoice(accounts[1].address);
            assert.equal(choice, CHOICES.NO);
        });
    });
});