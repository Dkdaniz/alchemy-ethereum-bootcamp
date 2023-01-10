const assert = require('assert');

const Blockchain = require('./Blockchain');
const Block = require('./Block');

let blockchain;

describe('Blockchain', function() {
    before(() => {
        blockchain = new Blockchain();
    });

    it('should have an addBlock function', function() {
        assert.equal(typeof blockchain.addBlock, 'function');
    });

    describe('adding new blocks', function() {
        let block1;
        let block2;
        before(() => {
            block1 = new Block("Some data");
            block2 = new Block("Some other data");
            blockchain.addBlock(block1);
            blockchain.addBlock(block2);
        });

        it('should be a chain of three blocks', function() {
            assert.equal(blockchain.chain.length, 3);
        });

        it('should include block1 and block2', function () {
            assert(blockchain.chain.some((x) => x === block1), "Could not find block1. Remember to push the block argument in addBlock!")
            assert(blockchain.chain.some((x) => x === block2), "Could not find block1. Remember to push the block argument in addBlock!")
        });
    });
});