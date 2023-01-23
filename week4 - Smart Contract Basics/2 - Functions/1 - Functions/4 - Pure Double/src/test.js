const { assert } = require('chai');
describe('Contract: double function', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    [1, 4, 7].forEach((x) => {
        const expected = x * 2;
        describe(`when the number is ${x}`, () => {
            it(`should double it to get ${expected}`, async () => {
                const doubled = await contract.callStatic.double(x);
                assert.equal(doubled.toNumber(), expected);
            });
        });
    });
});