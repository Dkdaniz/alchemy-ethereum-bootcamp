const { assert } = require('chai');

const getTotalTransactions = require('./getTotalTransactions');
const provider = require('./provider');

const ADDRESS = "0x5409ED021D9299bf6814279A6A1411A7e866A631";
function runTransaction() {
    return provider.send({
        id: 1,
        jsonrpc: "2.0",
        method: "eth_sendTransaction",
        params: [{ from: ADDRESS, to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567", value: 0x1 }]
    });
}

function mineBlock() {
    return provider.send({
        id: 1,
        jsonrpc: "2.0",
        method: "evm_mine",
    });
}

describe('getTotalTransactions', () => {
    before(async () => {
        await provider.send({
            id: 1,
            jsonrpc: "2.0",
            method: "miner_stop",
        });
    });

    describe('on the first block', () => {
        before(mineBlock);

        it('should return zero total transactions', async () => {
            const length = await getTotalTransactions(1);
            assert.equal(length, 0);
        });
    });

    describe('on the second block', () => {
        before(async () => {
            await runTransaction();
            await mineBlock();
        });

        it('should return one total transactions', async () => {
            const length = await getTotalTransactions(2);
            assert.equal(length, 1);
        });
    });

    describe('on the third block', () => {
        before(async () => {
            for (let i = 0; i < 5; i++) {
                await runTransaction();
            }
            await mineBlock();
        });

        it('should return five total transactions', async () => {
            const length = await getTotalTransactions(3);
            assert.equal(length, 5);
        });
    });

    describe('on the 11th block', () => {
        before(async () => {
            // mine blocks 4-10
            for (let i = 0; i < 7; i++) {
                await mineBlock();
            }
            for (let i = 0; i < 3; i++) {
                await runTransaction();
            }
            await mineBlock();
        });

        it('should return three total transactions', async () => {
            const length = await getTotalTransactions(11);
            assert.equal(length, 3);
        });
    });
});