const { assert } = require('chai');
describe('Voting', function () {
    const interface = new ethers.utils.Interface(["function mint(uint) external"]);
    const data = interface.encodeFunctionData("mint", [250]);
    const target = ethers.constants.AddressZero;
    let voter1, voter2;
    let contract;

    before(async () => {
        creator = await ethers.provider.getSigner(0).getAddress();
        voter1 = await ethers.provider.getSigner(1);
        voter2 = await ethers.provider.getSigner(2);

        const Voting = await ethers.getContractFactory("Voting");
        contract = await Voting.deploy();
        await contract.deployed();
    });

    describe('creating a new vote', () => {
        before(async () => {
            await contract.newProposal(target, data);
        });

        describe('casting four votes: three from the same address', () => {
            let attributes;
            before(async () => {
                let id = 0;
                await contract.connect(voter1).castVote(id, false);
                await contract.connect(voter1).castVote(id, true);
                await contract.connect(voter1).castVote(id, true);
                await contract.connect(voter2).castVote(id, false);
                attributes = await contract.proposals(id);
            });

            it('should have a yes count of 1', function () {
                assert(attributes.yesCount, 'Could not find the yes count');
                assert.equal(attributes.yesCount.toNumber(), 1);
            });

            it('should have a no count of 1', function () {
                assert(attributes.noCount, 'Could not find the no count');
                assert.equal(attributes.noCount.toNumber(), 1);
            });

            describe('creating a newer vote', function () {
                let attributes2;
                before(async () => {
                    await contract.newProposal(target, data);
                });

                describe('voting as the first voter', function () {
                    before(async () => {
                        let id = 1;
                        await contract.connect(voter1).castVote(id, true);
                        attributes2 = await contract.proposals(id);
                    });

                    it('should have a yes count of 1', function () {
                        assert(attributes2.yesCount, 'Could not find the yes count');
                        assert.equal(attributes2.yesCount.toNumber(), 1);
                    });

                    it('should have a no count of 0', function () {
                        assert(attributes2.noCount, 'Could not find the no count');
                        assert.equal(attributes2.noCount.toNumber(), 0);
                    });
                });
            });
        });
    });
});
