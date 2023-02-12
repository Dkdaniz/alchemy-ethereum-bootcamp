const { assert } = require('chai');
const deposit = ethers.utils.parseEther("1");
describe('Escrow', function () {
    let contract;
    let accounts = {};
    before(async () => {
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

    describe("after approval", () => {
        let beforeBalance;
        before(async () => {
            beforeBalance = await ethers.provider.getBalance(accounts.beneficiary.address);
            await contract.connect(accounts.arbiter.signer).approve();
        });

        it("should transfer (using .call()) balance to beneficiary", async () => {
            const after = await ethers.provider.getBalance(accounts.beneficiary.address);
            assert.equal(after.sub(beforeBalance).toString(), deposit.toString());
        });

        it("should set the isApproved state to true", async () => {
            const isApproved = await contract.isApproved();
            assert(isApproved, "Expected isApproved to be true!");
        });
    });
});