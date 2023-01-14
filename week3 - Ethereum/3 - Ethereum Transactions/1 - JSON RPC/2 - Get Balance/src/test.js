const { assert } = require('chai');
const getBalance = require('./getBalance');

describe('getBalance', () => {
    it('should find the balance of the address with 10 ether', async () => {
        const balance = await getBalance("0x5409ED021D9299bf6814279A6A1411A7e866A631");
        assert.equal(balance, 0x8ac7230489e80000);
    });
});