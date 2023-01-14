# Does it Contain the Word?

With the **`trie`** we should be able to quickly figure out if the data structure contains a word we are looking for.

For example, if we were to add a few words:

```js
const trie = new Trie();
trie.insert('happy');
trie.insert('healthy');
```
We should be able to check for those words:

```js
console.log( trie.contains('happy') ); // true
console.log( trie.contains('healthy') ); // true
```

Without it picking up on words that aren't contained:

```js
console.log( trie.contains('whimsical') ); // false
console.log( trie.contains('health') ); // false
```

☝️ Because these words are not in the trie, it should return `false`.

> ⚠️ Notice that second example is a bit tricky! The word "healthy" is in the trie, while the word "health" is not.

## 🏁 Your Goal: Implement Contains

Add a function `contains` to the `Trie` class.

This function should take a string `word` and return `true`/`false` depending on whether the word is in our trie or not.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or 

```bash
yarn mocha ./src/test.js
```