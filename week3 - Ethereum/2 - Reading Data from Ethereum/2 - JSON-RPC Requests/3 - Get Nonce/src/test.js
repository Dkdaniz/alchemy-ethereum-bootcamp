const { assert, util: { inspect } } = require('chai');
const getNonce = require('./getNonce');

describe('getNonce', () => {
    it('should get the nonce for the zero address', async () => {
        const nonce = await getNonce("0x0000000000000000000000000000000000000000");
        const parsed = parseInt(nonce);
        assert(!isNaN(parsed), `We expected you to return a nonce, here is what you returned: ${inspect(nonce)}`);
        assert.equal(parsed, 0);
    });

    it('should get the nonce for vitalik.eth', async () => {
        const nonce = await getNonce("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
        const parsed = parseInt(nonce);
        assert(!isNaN(parsed), `We expected you to return a nonce, here is what you returned: ${inspect(nonce)}`);
        assert.isAbove(parsed, 1015);
    });
});