const {assert} = require('chai');

const Trie = require('./Trie');
const TrieNode = require('./TrieNode');

describe('Trie', () => {
    it('should have a root trie node', () => {
        const trie = new Trie();
        assert(trie.root instanceof TrieNode, "expected Trie to have a property `root` which is an instance of TrieNode");
    });
});

describe('TrieNode', () => {
    it('should have store a key', () => {
        const node = new TrieNode('a');
        assert.equal(node.key, 'a', 'expected the constructor argument to be stored as the `key` property value');
    });
    it('should have store an object `children`', () => {
        const node = new TrieNode();
        assert.equal(typeof node.children, 'object', 'expected a property `children` to be an object on TrieNode');
    });
    it('should have store a property `isWord`', () => {
        const node = new TrieNode();
        assert.equal(node.isWord, false, 'expected a property `isWord` to be an object on TrieNode');
    });
});