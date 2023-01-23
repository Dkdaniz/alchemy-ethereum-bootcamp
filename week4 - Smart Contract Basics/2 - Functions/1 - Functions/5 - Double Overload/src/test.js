const { assert } = require('chai');
describe('Contract: double function', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    [[1, 3], [2, 4], [3, 7]].forEach(([x, y]) => {
        const [x2, y2] = [x * 2, y * 2];
        describe(`when the numbers are ${x} and ${y}`, () => {
            it(`should double them to get ${x2} and ${y2}`, async () => {
                const result = await contract.callStatic["double(uint256,uint256)"](x,y);
                assert.equal(result[0], x2);
                assert.equal(result[1], y2);
            });
        });
    });
});