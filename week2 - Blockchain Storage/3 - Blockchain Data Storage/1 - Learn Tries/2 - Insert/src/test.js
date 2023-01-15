const { assert } = require('chai');

const Trie = require('./Trie');
const TrieNode = require('./TrieNode');

describe('Trie', () => {
    describe('with a single word', () => {
        let trie;
        beforeEach(() => {
            trie = new Trie();
            trie.insert('HEY');
        });

        it('should connect the root to the first letter', () => {
            const firstNode = trie.root.children['H'];
            assert.equal(firstNode.key, 'H', 'expected the `key` of the first node to be `H`');
            assert(firstNode.children['E'], 'expected the `children` of the first node to have a connection to the next letter');
            assert.equal(firstNode.isWord, false, 'expected the `isWord` of the first node to be `false`');
        });
        
        it('should connect the root to the second letter', () => {
            const firstNode = trie.root.children['H'];
            const secondNode = firstNode.children['E'];
            assert.equal(secondNode.key, 'E', 'expected the `key` of the first node to be `E`');
            assert(secondNode.children['Y'], 'expected the `children` of the second node to have a connection to the next letter');
            assert.equal(secondNode.isWord, false, 'expected the `isWord` of the second node to be `false`');
        });

        it('should connect the root to the third letter', () => {
            const firstNode = trie.root.children['H'];
            const secondNode = firstNode.children['E'];
            const thirdNode = secondNode.children['Y'];
            assert.equal(thirdNode.key, 'Y', 'expected the `key` of the first node to be `Y`');
            assert.equal(Object.keys(thirdNode.children).length, 0, 'expected to have no `children` for the final node');
            assert.equal(thirdNode.isWord, true, 'expected the `isWord` of the final node to be `true`');
        });
    });
});