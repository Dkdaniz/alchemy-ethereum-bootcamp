const { assert } = require('chai');

const getNonce = require('./getNonce');
const provider = require('./provider');

const ADDRESS = "0x5409ED021D9299bf6814279A6A1411A7e866A631";

describe('getNonce', () => {
    it('should get the nonce', async () => {
        const nonce = await getNonce(ADDRESS)
        assert.equal(nonce, 0);
    });

    describe('after sending a transaction', () => {
        before(() => {
            return provider.send({ 
                id: 1, 
                jsonrpc: "2.0",
                method: "eth_sendTransaction", 
                params: [{ from: ADDRESS, to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567", value: 0x1 }]
            });
        });

        it('should get the nonce', async () => {
            const nonce = await getNonce(ADDRESS)
            assert.equal(nonce, 1);
        });
    });
});