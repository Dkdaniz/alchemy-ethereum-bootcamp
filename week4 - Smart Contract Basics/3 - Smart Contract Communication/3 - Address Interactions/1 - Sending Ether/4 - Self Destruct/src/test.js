const { assert } = require('chai');
describe('Contract', function () {
    const charity = ethers.Wallet.createRandom().address;
    const donation = ethers.utils.parseEther("1");
    let contract;
    let owner;
    let tipper;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy(charity);
        await contract.deployed();

        owner = ethers.provider.getSigner(0);
        await owner.sendTransaction({ to: contract.address, value: donation });
        tipper = ethers.provider.getSigner(1);
    });

    it('should store the owner', async () => {
        const _owner = await contract.owner.call();
        assert.equal(_owner, await owner.getAddress());
    });

    it('should receive the initial donation', async () => {
        const balance = await ethers.provider.getBalance(contract.address);
        assert(balance.eq(donation), "expected the ether to be received");
    });

    describe('after donating', () => {
        before(async () => {
            await contract.connect(tipper).donate();
        });

        it('should add the donations to the charity balance', async () => {
            const _donation = await ethers.provider.getBalance(charity);
            assert.equal(_donation.toString(), donation.toString());
        });

        it('should destroy the contract', async () => {
            const bytecode = await ethers.provider.getCode(contract.address);
            assert.equal(bytecode, "0x");
        });
    });
});