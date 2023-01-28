const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    describe('after 9 ticks', () => {
        before(async () => {
            for (let i = 0; i < 9; i++) {
                await contract.tick();
            }
        });

        it('should still exist', async () => {
            const bytecode = await ethers.provider.getCode(contract.address);
            assert(bytecode !== "0x", "Contract does not exist after 9 ticks!");
        });
    });

    describe('after the tenth tick', () => {
        before(async () => {
            await contract.tick();
        });

        it('should not have any code', async () => {
            const bytecode = await ethers.provider.getCode(contract.address);
            assert.equal(bytecode, "0x");
        });
    });
});