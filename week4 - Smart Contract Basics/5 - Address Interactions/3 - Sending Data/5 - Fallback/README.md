# Fallback

When calldata is sent to a contract, and the contract doesn't have a function signature to match the selector, it will trigger its fallback function.

So if we chose 4 bytes randomly and sent them to a contract, most likely this will not match a function signature and will invoke the fallback function if there is one. You could also choose to send less than 4 bytes or more than 4 bytes. So long as that first 4 bytes does not match a function selector, the fallback function will be triggered.


## 🏁 Your Goal: Trigger the fallback

In the `makeContact` method, send some calldata to the Hero contract that will trigger its fallback function.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```