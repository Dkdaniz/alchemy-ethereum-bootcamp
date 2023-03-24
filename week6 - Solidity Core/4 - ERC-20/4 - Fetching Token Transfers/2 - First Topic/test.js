const { assert } = require('chai');
const { firstTopic } = require('./topics');

describe('firstTopic', () => {
    it('should match our expected output', () => {
        assert.equal(firstTopic(), "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef");
    });
});