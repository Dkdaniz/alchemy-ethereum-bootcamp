const { assert, util: { inspect } } = require('chai');
const getTotalBalance = require('./getTotalBalance');

const addresses = [
    '0x830389b854770e9102eb957379c6b70da4283d60',
    '0xef0613ab211cfb5eeb5a160b65303d6e927f3f85',
    '0x5311fce951684e46cefd804704a06c5133030dff',
    '0xe01c0bdc8f2a8a6220a4bed665ceeb1d2c716bcb',
    '0xf6c68965cdc903164284b482ef5dfdb640d9e0de'
];

describe('getTotalBalance', () => {
    it('should find the total balance of all the addresses', async () => {
        const totalBalance = await getTotalBalance(addresses);
        const parsed = parseInt(totalBalance);
        assert(!isNaN(parsed), `We expected you to return a total balance, here is what you returned: ${inspect(totalBalance)}`);
        assert.isAtLeast(parsed, 250000000000000000);
    });
});