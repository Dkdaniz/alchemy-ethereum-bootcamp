const { assert } = require('chai');

const MerkleTree = require('./index');

const concat = (a, b) => `Hash(${a} + ${b})`;

describe('merkle', function () {
  it('should handle the base case: [A]', function () {
    const leaves = ['A'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "A");
  });

  it('should create a root from two leaves: [A,B]', function () {
    const leaves = ['A', 'B'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(A + B)");
  });

  it('should create a root from four leaves: [A,B,C,D]', function () {
    const leaves = ['A', 'B', 'C', 'D'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(A + B) + Hash(C + D))");
  });

  it('should create a root from three leaves: [A,B,C]', function() {
    const leaves = ['A', 'B', 'C'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(A + B) + C)");
  });
  
  it('should create a root from five leaves: [A,B,C,D,E]', function () {
    const leaves = ['A', 'B', 'C', 'D', 'E'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(Hash(A + B) + Hash(C + D)) + E)");
  });

  it('should create a root from seven leaves: [A,B,C,D,E,F,G]', function () {
    const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + G))");
  });
});