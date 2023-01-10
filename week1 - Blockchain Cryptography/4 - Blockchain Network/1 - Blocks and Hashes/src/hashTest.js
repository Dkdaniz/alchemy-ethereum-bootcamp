const assert = require('assert');

const Block = require('./Block');

describe('Block', function() {
    const newBlock = new Block();

    it('should have a hash property', function() {
        assert(/^[0-9A-F]{64}$/i.test(newBlock.toHash()));
    });
});