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

    describe("after approval from address other than the arbiter", () => {
        it("should revert", async () => {
            let ex;
            try {
                await contract.connect(accounts.beneficiary.signer).approve();
            }
            catch (_ex) {
                ex = _ex;
            }
            assert(ex, "Attempted to approve the Escrow from the beneficiary address. Expected transaction to revert!");
        });
    });

    describe("after approval from the arbiter", () => {
        it("should transfer balance to beneficiary", async () => {
            const before = await ethers.provider.getBalance(accounts.beneficiary.address);
            await contract.connect(accounts.arbiter.signer).approve();
            const after = await ethers.provider.getBalance(accounts.beneficiary.address);
            assert.equal(after.sub(before).toString(), deposit.toString());
        });
    });
});