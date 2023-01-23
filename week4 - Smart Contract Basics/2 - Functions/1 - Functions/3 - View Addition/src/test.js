const { assert } = require('chai');
describe('Contract: add function', function () {
    [[1, 3], [2, 4], [3, 7]].forEach(([x, y]) => {
        const expectedSum = x + y;
        describe(`when the contract is deployed with ${x}`, () => {
            let contract;
            before(async () => {
                const Contract = await ethers.getContractFactory("Contract");
                contract = await Contract.deploy(x);
                await contract.deployed();
            });
            it(`it should add ${y} to get ${expectedSum}`, async () => { 
                const sum = await contract.callStatic.add(y);
                assert.equal(sum.toNumber(), expectedSum);
            });
        });
    });
});