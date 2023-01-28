const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    const value = ethers.utils.parseEther("2");
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy({ value });
        await contract.deployed();
    });

    it('should fail when another account attempts to withdraw', async () => {
        let ex;
        try {
            const signer = ethers.provider.getSigner(1);
            await contract.connect(signer).withdraw();
        }
        catch (_ex) { ex = _ex }
        if (!ex) {
            assert.fail("Attempt to withdraw with non-owner did not fail!");
        }
    });

    it('should succeed when the owner attempts to withdraw', async () => {
        const owner = ethers.provider.getSigner(0);
        const balanceBefore = await ethers.provider.getBalance(await owner.getAddress());
        const gasPrice = ethers.utils.parseUnits("2", "gwei");
        const tx = await contract.connect(owner).withdraw({ gasPrice });
        const receipt = await tx.wait();
        const etherUsed = receipt.gasUsed.mul(gasPrice);
        const balanceAfter = await ethers.provider.getBalance(await owner.getAddress());
        assert.equal(
            balanceAfter.toString(),
            balanceBefore.sub(etherUsed).add(value).toString(),
            "Unexpected Owner Balance (did you withdraw all funds?)"
        );
    });
});