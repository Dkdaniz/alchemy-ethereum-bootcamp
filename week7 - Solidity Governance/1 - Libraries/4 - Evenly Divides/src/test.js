const { assert } = require('chai');
describe('Prime', function () {
    let library;
    before(async () => {
        const Prime = await ethers.getContractFactory("Prime");
        library = await Prime.deploy();
        await library.deployed();
    });

    it('should detect numbers that evenly divide', async () => {
        const pairs = [[4, 2], [16, 4], [200, 50]];
        for (let i = 0; i < pairs.length; i++) {
            const [x, y] = pairs[i];
            const dividesEvenly = await library.callStatic.dividesEvenly(x, y);
            assert(dividesEvenly, `Expected dividesEvenly to return true for ${x} divided by ${y}!`);
        }
    });

    it('should detect numbers that do not evenly divide', async () => {
        const pairs = [[5, 2], [22, 4], [199, 50]];
        for (let i = 0; i < pairs.length; i++) {
            const [x, y] = pairs[i];
            const dividesEvenly = await library.callStatic.dividesEvenly(x, y);
            assert(!dividesEvenly, `Expected dividesEvenly to return false for ${x} divided by ${y}!`);
        }
    });
});