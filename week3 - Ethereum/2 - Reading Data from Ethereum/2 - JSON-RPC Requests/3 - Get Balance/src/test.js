const { assert, util: { inspect } } = require('chai');
const getBalance = require('./getBalance');

describe('getBalance', () => {
    it('should find the balance of the address with 10 ether', async () => {
        const balance = await getBalance("0x3bfc20f0b9afcace800d73d2191166ff16540258");
        const parsed = parseInt(balance);
        assert(!isNaN(parsed), `We expected you to return a balance, here is what you returned: ${inspect(balance)}`);
        assert.isAbove(parsed, 0x40db451e4e74a0311e90);
    });
});