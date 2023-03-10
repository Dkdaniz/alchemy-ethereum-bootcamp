const { assert, util: { inspect } } = require('chai');
const getTotalTransactions = require('./getTotalTransactions');

describe('getTotalTransactions', () => {
    it('should work for an empty block', async () => {
        const numTx = await getTotalTransactions('0x' + (12379).toString(16));
        const parsed = parseInt(numTx);
        assert(!isNaN(parsed), `We expected you to return a transactions count, here is what you returned: ${inspect(numTx)}`);
        assert.equal(parsed, 0);
    });

    it('should work for a recent block', async () => {
        const numTx = await getTotalTransactions('0x' + (16642379).toString(16));
        const parsed = parseInt(numTx);
        assert(!isNaN(parsed), `We expected you to return a transactions count, here is what you returned: ${inspect(numTx)}`);
        assert.equal(parsed, 206);
    });
});