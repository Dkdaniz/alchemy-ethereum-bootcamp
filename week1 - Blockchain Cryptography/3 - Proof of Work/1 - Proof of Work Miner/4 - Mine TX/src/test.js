const { assert } = require('chai');
const { mine, blocks, mempool, addTransaction } = require('./index');
const SHA256 = require('crypto-js/sha256');

describe('mine', () => {
    describe('with 5 mempool transactions', () => {
        before(() => {
            for(let i = 0; i < 5; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {
                assert.equal(blocks.length, 1);
            });
            it('should store the transactions on the block', () => {
                assert.equal(blocks[blocks.length - 1].transactions.length, 5);
            });
            it('should clear the mempool', () => {
                assert.equal(mempool.length, 0);
            });
        });
    });
    describe('with 15 mempool transactions', () => {
        before(() => {
            for (let i = 0; i < 15; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {
                assert.equal(blocks.length, 2);
            });
            it('should store the transactions on the block', () => {
                assert.equal(blocks[blocks.length - 1].transactions.length, 10);
            });
            it('should reduce the mempool to 5', () => {
                assert.equal(mempool.length, 5);
            });
            describe('after mining again', () => {
                before(() => {
                    mine();
                });
                it('should add to the blocks', () => {
                    assert.equal(blocks.length, 3);
                });
                it('should store the transactions on the block', () => {
                    assert.equal(blocks[blocks.length - 1].transactions.length, 5);
                });
                it('should clear the mempool', () => {
                    assert.equal(mempool.length, 0);
                });
            });
        });
    });
});