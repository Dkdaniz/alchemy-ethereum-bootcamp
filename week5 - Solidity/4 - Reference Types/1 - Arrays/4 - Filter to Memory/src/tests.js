const { assert } = require('chai')
describe('Contract', function () {
    let contract;
    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should store the filtered evenNumbers', async () => {
        await contract.filterEven([1, 2, 1, 4, 5]);
        assert.sameMembers(await getArrayElements(contract.evenNumbers), [2, 4]);
    });

    it('should store the filtered evenNumbers', async () => {
        await contract.filterEven([1, 1, 2, 10, 2]);
        assert.sameMembers(await getArrayElements(contract.evenNumbers), [2, 10, 2]);
    });
});

async function getArrayElements(getterFn) {
    let vals = [];
    try {
        for (i = 0; ; i++) {
            vals.push(await getterFn(i));
        }
    }
    catch (ex) { }
    return vals.map(x => Number(x));
}