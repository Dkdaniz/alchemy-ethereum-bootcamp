const { assert } = require('chai');
describe('Voting', function () {
    const target = ethers.constants.AddressZero;
    let accounts;
    let contract;

    before(async () => {
        accounts = await ethers.provider.listAccounts();

        const Voting = await ethers.getContractFactory("Voting");
        contract = await Voting.deploy();
        await contract.deployed();
    });

    describe('creating a new proposal', () => {
        const interface = new ethers.utils.Interface(["function mint(uint) external"]);
        const data1 = interface.encodeFunctionData("mint", [250]);
        const data2 = interface.encodeFunctionData("mint", [300]);
        let event1;
        beforeEach(async () => {
            const tx = await (await contract.newProposal(target, data1)).wait();
            event1 = tx.events.find(x => x.event === "ProposalCreated");
        });

        it('should broadcast a `ProposalCreated` event with a valid voteId', async () => {
            assert(event1, "The `newProposal` transaction did not emit a `ProposalCreated` event!");
            const proposal = await contract.proposals(event1.args[0]);
            assert.equal(proposal.data, data1);
        });

        describe('casting a vote', () => {
            let event2;
            beforeEach(async () => {
                const signer = await ethers.provider.getSigner(accounts[1]);
                const tx = await contract.connect(signer).castVote(0, false);
                const receipt = await tx.wait();
                event2 = receipt.events.find(x => x.event === "VoteCast");
            });

            it('should broadcast a `VoteCast` event with a valid voteId', async () => {
                assert(event2, "The `castVote` transaction did not emit a `VoteCast` event!");
                const proposal = await contract.proposals(event2.args[0]);
                assert.equal(proposal.data, data1);
            });

            it('should broadcast a `VoteCast` event with the correct address', async () => {
                assert(event2, "The `castVote` transaction did not emit a `VoteCast` event!");
                assert.equal(event2.args[1], accounts[1], "Expected the second argument of VoteCast to be the voter address!");
            });
        });

        describe('after creating a new proposal', () => {
            let event2;
            beforeEach(async () => {
                const tx = await contract.newProposal(target, data2);
                const receipt = await tx.wait();
                event2 = receipt.events.find(x => x.event === "ProposalCreated");
            });

            it('should broadcast a `ProposalCreated` event with a valid voteId', async () => {
                assert(event2, "The `newProposal` transaction did not emit a `ProposalCreated` event!");
                const proposal = await contract.proposals(event2.args[0]);
                assert.equal(proposal.data, data2);
            });

            describe('casting a vote on the initial proposal', () => {
                let event3;
                beforeEach(async () => {
                    const signer = await ethers.provider.getSigner(accounts[1]);
                    const tx = await contract.connect(signer).castVote(0, false);
                    const receipt = await tx.wait();
                    event3 = receipt.events.find(x => x.event === "VoteCast");
                });

                it('should broadcast a `VoteCast` event with the original voteId', async () => {
                    assert(event2, "The `castVote` transaction did not emit a `VoteCast` event!");
                    const proposal = await contract.proposals(event3.args[0]);
                    assert.equal(proposal.data, data1);
                });
            });
        });
    });
});