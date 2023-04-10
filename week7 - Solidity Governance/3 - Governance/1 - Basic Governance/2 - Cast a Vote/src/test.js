const { assert } = require('chai');
describe('Voting', function () {
    const interface = new ethers.utils.Interface(["function mint(uint) external"]);
    const data = interface.encodeFunctionData("mint", [250]);
    const target = ethers.constants.AddressZero;
    let voter1, voter2, voter3;
    let voting;

    before(async () => {
        creator = await ethers.provider.getSigner(0).getAddress();
        voter1 = await ethers.provider.getSigner(1);
        voter2 = await ethers.provider.getSigner(2);
        voter3 = await ethers.provider.getSigner(3);

        const Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy();
        await voting.deployed();
    });

    describe('creating a new vote', () => {
        before(async () => {
            await voting.newProposal(target, data);
        });

        describe('casting three votes', () => {
            let attributes;
            before(async () => {
                let id = 0;
                await voting.connect(voter1).castVote(id, true);
                await voting.connect(voter2).castVote(id, true);
                await voting.connect(voter3).castVote(id, false);
                attributes = await voting.proposals(id);
            });

            it('should have a yes count of 2', function () {
                assert(attributes.yesCount, 'Could not find a yes count');
                assert.equal(attributes.yesCount.toNumber(), 2);
            });

            it('should have a no count of 1', function () {
                assert(attributes.noCount, 'Could not find a no count');
                assert.equal(attributes.noCount.toNumber(), 1);
            });
        });
    });
});
