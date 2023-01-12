const { assert } = require('chai');

const Node = require('./Node');

describe('node', () => {
    const data = 3;
    const node = new Node(data);

    it('should store data', () => {
        assert.equal(node.data, 3);
    });

    it('should have a null left', () => {
        assert.strictEqual(node.left, null);
    });

    it('should have a null right', () => {
        assert.strictEqual(node.right, null);
    });
});