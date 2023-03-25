const { assert } = require('chai');
const totalErc20Transfers = require('./index');

describe('totalErc20Transfers', () => {
    it('should work for a block interval containing 184 ERC20 transfers', async () => {
        const total = await totalErc20Transfers("0xff2db0", "0xff2eb0");
        assert.equal(total, 184);
    });

    it('should work for a block interval containing 572 transfers', async () => {
        const total = await totalErc20Transfers("0xff2ab0", "0xff2eb0");
        assert.equal(total, 572);
    });
});