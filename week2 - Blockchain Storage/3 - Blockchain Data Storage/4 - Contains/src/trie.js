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

    search(current, character, restCharacter){
        const [newChar, ...restChar] = restCharacter;

        if(current.children[character] === undefined){
            return false
        }

        if(restCharacter.length === 0) {
            if(current.children[character].isWord === true){
                return true;
            }else{
                return false;
            }
        }

        return this.search(current.children[character], newChar, restChar);
    }

    insert(word){
        let current = this.root
        const caracteteres = word.split("");
        const [newChar, ...restChar] = caracteteres;

        this.add(current, newChar, restChar);
    }

    contains(word) {
        let current = this.root
        const caracteteres = word.split("");
        const [newChar, ...restChar] = caracteteres;

        return this.search(current, newChar, restChar);
    }
}

module.exports = Trie;