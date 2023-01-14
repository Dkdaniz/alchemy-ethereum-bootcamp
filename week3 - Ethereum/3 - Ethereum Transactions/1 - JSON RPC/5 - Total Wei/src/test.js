const { assert } = require('chai');

const getTotalBalance = require('./getTotalBalance');

const addresses = [
    '0x5409ed021d9299bf6814279a6a1411a7e866a631',
    '0xebbe46f475db84e70313592eb4f94df73043c118',
    '0xd4d38fc5fd03a9beba9e9a41573ef8de75c2784c',
    '0xec4a61ce697253baa1088b2ea9112b9483098e64',
    '0xfbf1d566853edc65cdeda8e22975ca1ebfc4ed38'
];

describe('getTotalBalance', () => {
    it('should find the total balance of all the addresses', async () => {
        const totalBalance = await getTotalBalance(addresses);
        assert.equal(totalBalance, "15".padEnd(19, "0"));
    });
});