const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    [[2,2,4,4], [1,3,5,7], [8,8,8,8]].forEach(([a,b,c,d]) => {
        const expectedSum = a + b + c + d;
        const expectedAverage = expectedSum / 4;
        describe(`for ${a}, ${b}, ${c} and ${d}`, () => {
            it(`it should return ${expectedSum} and ${expectedAverage}`, async () => {
                const values = await contract.sumAndAverage(a,b,c,d);
                assert.equal(values[0], expectedSum);
                assert.equal(values[1], expectedAverage);
            });
        });
    });
});