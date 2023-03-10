const { assert, util: { inspect } } = require('chai');
const getBlockNumber = require('./getBlockNumber');

describe('getBlockNumber', function () {
    it('should get the current block number', async () => {
        const blockNumber = await getBlockNumber();
        const parsed = parseInt(blockNumber);
        assert(!isNaN(parsed), `We expected you to return a block number, here is what you returned: ${inspect(blockNumber)}`);
        assert.isAbove(parseInt(blockNumber), 0xfde2cf);
    });
});