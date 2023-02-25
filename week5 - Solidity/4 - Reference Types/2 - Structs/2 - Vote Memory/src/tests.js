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
        let vote;
        before(async () => {
            vote = await contract.connect(accounts[0].signer).callStatic.createVote(CHOICES.YES);
        });

        it('should return a vote', async () => {
            assert.equal(vote.choice, CHOICES.YES);
            assert.equal(vote.voter, accounts[0].address);
        });
    });

    describe('after voting no', () => {
        let vote;
        before(async () => {
            vote = await contract.connect(accounts[1].signer).callStatic.createVote(CHOICES.NO);
        });

        it('should return a vote', async () => {
            assert.equal(vote.choice, CHOICES.NO);
            assert.equal(vote.voter, accounts[1].address);
        });
    });
});