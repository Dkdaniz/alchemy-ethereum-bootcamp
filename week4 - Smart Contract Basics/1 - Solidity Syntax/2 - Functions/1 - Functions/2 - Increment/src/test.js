const { assert } = require('chai');
const num = 0;
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy(num);
        await contract.deployed();
    });

    it('should set the initial value to 0', async () => {
        const x = await contract.callStatic.x();
        assert.equal(x.toNumber(), 0);
    });

    describe('after one increment call', () => {
        before(async () => {
            await contract.increment();
        });

        it('should increase the value to 1', async () => {
            const x = await contract.callStatic.x();
            assert.equal(x.toNumber(), 1);
        });
    });

    describe('after a second increment call', () => {
        before(async () => {
            await contract.increment();
        });

        it('should increase the value to 2', async () => {
            const x = await contract.callStatic.x();
            assert.equal(x.toNumber(), 2);
        });
    });
});