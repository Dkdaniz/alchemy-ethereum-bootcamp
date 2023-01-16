# Variable Shadowing

We're quite early in our Solidity lessons and we're already discussing **`Variable Shadowing`**. Yet this didn't come up in the JavaScript lessons. Was it still an issue? Let's think back. 💭

# JavaScript

In JavaScript we talked about variable **`scope`**. 🔭

For example we know that `let` scopes a variable a block `{}`. If we tried to access that variable outside of the scope, we'd be out of luck!

Let's see an example **`in JavaScript`**:

```js
if(true) {
    let a = "Hello World!";
}

console.log(a); // ReferenceError: a is not defined
```

☝️ Here, the JavaScript engine will throw a **`ReferenceError`** because `a` is restricted to the block scope after the if statement.

So that's an example of **`variable scope`**. What about **`variable shadowing in JavaScript`**? 🤔

Let's see another example:

```js
let a = "Hello World";

if(true) {
    let a = "Hello World 2";
    console.log(a); // Hello World 2
}
```

☝️ Here is a case where the outer `a` is shadowed by the inner `a` variable. At the c`onsole.log` line we don't have access to the outer a variable.

Kind of a silly example, to be honest! 😅

Shadowing just doesn't come up that often in JavaScript naturally.

Let's consider the `class` keyword:

```js
class Food {
    constructor() {
        this.name = "pizza"; 
    }
    changeName(name) {
        // not shadowed! 
        this.name = name;
    }
}
```

☝️ `this` is the **`big difference.`** 😉

In JavaScript we use the `this` keyword to refer to member variables within the class. Even if we use the same parameter name it won't shadow it since we need to preface our member variable with `this`.

# Solidity

Now back to Solidity! In Solidity we are much more likely to see variable shadowing:

```js
string public name;

constructor(string name) {
    // name is shadowed!
}
```

☝️ In this case the state variable `name` is shadowed by the parameter `name`!

⚠️ The compiler will warn us when we do something like this. The compiler will say: "Warning: This declaration shadows an existing declaration." showing us both the shadowing variable and the existing declaration. Compiler warnings can be very helpful for debugging and avoiding common mistakes.

Technically there is a way around this:

```js
contract MyContract {
    string public name;

    constructor(string name) {
        MyContract.name = name;
    }
}
```
☝️ Now we're using the reference to `MyContract` to update the state variable. This is not the typical approach. In general you'll see the undescore parameter (i.e. `_variableName`) over anything else.
