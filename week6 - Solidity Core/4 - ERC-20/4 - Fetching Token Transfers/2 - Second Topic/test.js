const { assert } = require('chai');
const { secondTopic } = require('./topics');

describe('secondTopic', () => {
    it('should pad the address properly for the second topic', () => {
        const topic = secondTopic();
        assert.equal(topic.length, 64, "expected the topic length to be 64 characters");
        assert.equal(topic.slice(0, 24), "0".repeat(24), "expected the first 12 bytes to be zeroes");
        assert.equal(topic.slice(24), "28c6c06298d514db089934071355e5743bf21d60", "expected the last 20 bytes to be the address");
    });
});