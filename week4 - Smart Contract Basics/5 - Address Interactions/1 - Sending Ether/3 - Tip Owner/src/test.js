const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    let value = ethers.utils.parseEther("1");
    let owner;
    let tipper;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();

        owner = ethers.provider.getSigner(0);
        await owner.sendTransaction({ to: contract.address, value });
        tipper = ethers.provider.getSigner(1);
    });

    it('should store the owner', async () => {
        const _owner = await contract.owner.call();
        assert.equal(_owner, await owner.getAddress());
    });

    it('should receive the ether', async () => {
        const balance = await ethers.provider.getBalance(contract.address);
        assert(balance.eq(value), "expected the ether to be received");
    });
    
    describe('after a .25 ether tip', () => {
        const tip = ethers.utils.parseEther("0.25");
        let balanceBefore;
        before(async () => {
            balanceBefore = await ethers.provider.getBalance(await owner.getAddress());
            await contract.connect(tipper).tip({ value: tip });
        });

        it('should send the tip to the owner', async () => {
            const balanceAfter = await ethers.provider.getBalance(await owner.getAddress());
            assert.equal(balanceAfter.sub(balanceBefore).toString(), tip);
        });
    });

    describe('after a .5 ether tip', () => {
        const tip = ethers.utils.parseEther("0.5");
        let balanceBefore;
        before(async () => {
            balanceBefore = await ethers.provider.getBalance(await owner.getAddress());
            await contract.connect(tipper).tip({ value: tip });
        });

        it('should send the tip to the owner', async () => {
            const balanceAfter = await ethers.provider.getBalance(await owner.getAddress());
            assert.equal(balanceAfter.sub(balanceBefore).toString(), tip);
        });
    });
});