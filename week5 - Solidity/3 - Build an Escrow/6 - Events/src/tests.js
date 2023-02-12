const { assert } = require('chai');
const deposit = ethers.utils.parseEther("1");
describe('Escrow', function () {
    let contract;
    let accounts = {};
    beforeEach(async () => {
        const roles = ['arbiter', 'beneficiary', 'depositor'];
        for (let i = 0; i < roles.length; i++) {
            const signer = ethers.provider.getSigner(i);
            const address = await signer.getAddress();
            accounts[roles[i]] = { signer, address }
        }

        const Contract = await ethers.getContractFactory("Escrow");
        contract = await Contract.connect(accounts.depositor.signer).deploy(
            accounts.arbiter.address,
            accounts.beneficiary.address,
            { value: deposit }
        );
        await contract.deployed();
    });

    it("should be funded", async () => {
        let balance = await ethers.provider.getBalance(contract.address);
        assert.equal(balance.toString(), deposit.toString());
    });

    it("should default the isApproved state to false", async () => {
        const isApproved = await contract.isApproved();
        assert(!isApproved, "Expected isApproved to be false!");
    });

    describe("after approval from the arbiter", () => {
        let before;
        let receipt;
        beforeEach(async () => {
            before = await ethers.provider.getBalance(accounts.beneficiary.address);
            let tx = await contract.connect(accounts.arbiter.signer).approve();
            receipt = await tx.wait();
        });

        it("should transfer balance to beneficiary", async () => {
            const after = await ethers.provider.getBalance(accounts.beneficiary.address);
            assert.equal(after.sub(before).toString(), deposit.toString());
        });

        it("should emit the event", async () => {
            const event = receipt.events.find(x => x.event === "Approved");
            assert(event, "Expect an Approved event to be emitted!");
            const amount = event.args[0];
            assert.equal(
                amount.toString(), deposit.toString(),
                "Expected the deposit amount to be emitted in the Approved event!"
            );
        });

        it("should set the isApproved state to true", async () => {
            const isApproved = await contract.isApproved();
            assert(isApproved, "Expected isApproved to be true!");
        });
    });
});