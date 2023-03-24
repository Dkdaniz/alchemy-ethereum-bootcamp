const { assert } = require('chai');
const totalDaiTransferred = require('./totalDaiTransferred');

describe('totalDaiTransferred', () => {
    it('should work for a block interval containing 9 transfers', async () => {
        const daiTransferred = await totalDaiTransferred("0xff26e1", "0xff2eb0");
        assert.equal(daiTransferred, 40002218271580000000000n);
    });

    it('should work for a block interval containing 2335 transfers', async () => {
        const daiTransferred = await totalDaiTransferred("0xfa26e1", "0xff2eb0");
        assert.equal(daiTransferred, 228084566470652280000000000n);
    });
});