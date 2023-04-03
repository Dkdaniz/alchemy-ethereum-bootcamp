const { assert } = require('chai');
describe('UIntFunctions', function () {
    let library;
    before(async () => {
        const Library = await ethers.getContractFactory("UIntFunctions");
        library = await Library.deploy();
        await library.deployed();
    });

    it('should create detect even numbers', async () => {
        const evens = [2, 4, 6];
        for (let i = 0; i < evens.length; i++) {
            const even = evens[i];
            const isEven = await library.callStatic.isEven(even);
            assert(isEven, `Expected isEven to return true for ${i}!`);
        }
    });

    it('should create detect odd numbers', async () => {
        const odds = [1, 3, 5];
        for (let i = 0; i < odds.length; i++) {
            const odd = odds[i];
            const isEven = await library.callStatic.isEven(odd);
            assert(!isEven, `Did not expect isEven to return true for ${i}!`);
        }
    });
});