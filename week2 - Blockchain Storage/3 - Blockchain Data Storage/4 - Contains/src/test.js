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

        it('should properly detect words that are contained', () => {
            assert(trie.contains('hey'), "Expected the trie to contain `hey`!");
        });

        it('should properly detect words that are not contained', () => {
            assert(!trie.contains('hello'), "Expected the trie to not contain `hello`!");
            assert(!trie.contains('he'), "Expected the trie to not contain `he`!");
            assert(!trie.contains('hi'), "Expected the trie to not contain `hi`!");
            assert(!trie.contains('heya'), "Expected the trie to not contain `heya`!");
        });
    });
});