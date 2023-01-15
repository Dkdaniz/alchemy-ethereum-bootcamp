const { assert } = require('chai');

const Trie = require('./Trie');
const TrieNode = require('./TrieNode');

describe('Trie', () => {
    describe('with a single word', () => {
        let trie;
        beforeEach(() => {
            trie = new Trie();
            trie.insert('hey');
        });

        it('should connect the root to the first letter', () => {
            const firstNode = trie.root.children['h'];
            assert.equal(firstNode.key, 'h', 'expected the `key` of the first node to be `h`');
            assert(firstNode.children['e'], 'expected the `children` of the first node to have a connection to the next letter');
            assert.equal(firstNode.isWord, false, 'expected the `isWord` of the first node to be `false`');
        });

        it('should connect the root to the second letter', () => {
            const firstNode = trie.root.children['h'];
            const secondNode = firstNode.children['e'];
            assert.equal(secondNode.key, 'e', 'expected the `key` of the first node to be `e`');
            assert(secondNode.children['y'], 'expected the `children` of the second node to have a connection to the next letter');
            assert.equal(secondNode.isWord, false, 'expected the `isWord` of the second node to be `false`');
        });

        it('should connect the root to the third letter', () => {
            const firstNode = trie.root.children['h'];
            const secondNode = firstNode.children['e'];
            const thirdNode = secondNode.children['y'];
            assert.equal(thirdNode.key, 'y', 'expected the `key` of the first node to be `y`');
            assert.equal(Object.keys(thirdNode.children).length, 0, 'expected to have no `children` for the final node');
            assert.equal(thirdNode.isWord, true, 'expected the `isWord` of the final node to be `true`');
        });
    });

    describe('with three words', () => {
        let trie;
        let words = ['helipad', 'hello', 'hermit'];
        beforeEach(() => {
            trie = new Trie();
            words.forEach(word => trie.insert(word));
        });

        words.forEach((word) => {
            describe(`for ${word}`, () => {
                it('should connect to the final letter', () => {
                    const finalNode = word.split("").reduce((node, letter) => node.children[letter], trie.root);
                    assert(finalNode);
                    assert.equal(finalNode.isWord, true, "expected the final node `isWord` to be set to true");
                });
            });
        });
    });
});