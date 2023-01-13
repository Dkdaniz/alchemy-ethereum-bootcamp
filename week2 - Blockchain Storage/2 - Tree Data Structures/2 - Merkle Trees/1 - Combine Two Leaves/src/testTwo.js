const {assert} = require('chai');
const MerkleTree = require('./index');

describe('merkle', function() {
  it('should create a root from two leaves: [A,B]', function() {
    const leaves = ['A', 'B'];
    const concat = (a, b) => `Hash(${a} + ${b})`;

    const merkleTree = new MerkleTree(leaves, concat);

    assert.equal(merkleTree.getRoot(), "Hash(A + B)");
  });
});