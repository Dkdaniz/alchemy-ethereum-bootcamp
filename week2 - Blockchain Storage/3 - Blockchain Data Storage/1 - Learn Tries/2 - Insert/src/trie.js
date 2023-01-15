const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    add(current, character, restCharacter){    
        const [newChar, ...restChar] = restCharacter;
        const isWord = restCharacter.length === 0 ? true : false;

        if(current.children[character] === undefined){
            current.children[character] = new TrieNode(character)
            current.children[character].isWord = isWord;
        } 
        
        if(isWord === true) return current;

        this.add(current.children[character], newChar, restChar);
    }

    insert(word){
        let current = this.root
        const caracteteres = word.split("");
        const [newChar, ...restChar] = caracteteres;

        this.add(current, newChar, restChar);
    }
}

module.exports = Trie;