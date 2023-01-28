# Function Signature

As mentioned in the introduction, the first step to forming calldata manually is taking the keccak256 hash of the function signature you are targetting.

So, for example, if we we are trying to call `rumble`:

```js
function rumble() external;
```

☝️ We need to take the keccak256 hash of `rumble()` and grab the first 4 bytes. As it turns out, those 4 bytes are 0x7e47cd7e. This would be our entire calldata to make the function call to `rumble` on a contract!


## 🏁 Your Goal: Alert Hero, Manually

Alert the Hero, manually this time!

Fill in the function signature for the Hero's `alert` function. Notice that we are taking the first 4 bytes of the hash of this function and passing it in as calldata to the hero.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```