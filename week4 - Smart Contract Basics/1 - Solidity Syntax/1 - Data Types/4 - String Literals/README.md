# String Literals

We can create strings of characters using double quotes just like in JavaScript: the **`string literal`** `"Hello World"` is perfectly valid in Solidity.

> 📖 You'll often see fixed values described as a literal. The value `"Hello World"` can be described as a **`string literal`** which differentiates it from the **`string data type`**. Any fixed value could be a literal, `"Hello World"`, `42`, or `true`.

A string literal can be stored in both the `bytes` and `string` types:

```js
bytes msg1 = "Hello World"; 
string msg2 = "Hello World";
```

☝️ For a **`long`** human-readable message it is recommended to use `string` since it will be easier to read the values from the blockchain storage from the outside (like for a front-end application).

If the string is **`shorter than 32 bytes`**, it is more efficient to store it in a fixed-size byte array like `bytes32`. This simplifies the computation since the memory is allocated ahead of time. On the other hand, both `string` and `bytes` will allocate their memory dynamically depending on the size of the string.

How many characters can be stored in `bytes32`? 🤔

Well this is actually depends on the characters themselves! Many characters in UTF-8 encoding can be represented with 1 byte while others are represented with several bytes. For instance `c` is encoded by `0x63`, while ć is encoded by `0xc487`.

So the maximum values would be:

```js
bytes32 msg1 = "cccccccccccccccccccccccccccccccc"; 
bytes32 msg2 = "ćććććććććććććććć"; 
```

☝️ Adding a character to either string will result in a compile-time error since the string literal would no longer fit into 32 bytes.

> 💡 Quite often **`long strings`** are stored seperately on other distributed services like IPFS, with a hash representation stored on the blockchain (since storage on a blockchain is expensive!). For example, you could write a legal document and hash the contents along with digital signatures to prove that it was signed. As long as the original document is preserved it can be easily proven that it was signed by rehashing the contents.

## 🏁 Your Goal: Hello World

It's time to do Hello World in Solidity! 😃

1. Create a `public bytes32` state variable `msg1` which stores a string literal containing "Hello World".

> 🎨 Feel free to change the casing and add any other characters into `msg1` as long as it still contains the message "hello world".

2. Create a `public string` state variable `msg2` which stores a string literal that requires over 32 bytes to store.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
