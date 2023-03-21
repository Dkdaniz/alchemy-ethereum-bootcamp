# Events 📣

Events give external applications a way to "listen-in" on the happenings inside of the EVM. Events can essentially as hooks for an application to perform some action.

An example of a UI listening for changes to our ERC20 Token might be a Decentralized Exchange. It's waiting to see when a transfer has account to or from your account to update your balance. It could subscribe to events on an Ethereum node and then broadcast any changes to the web interface where you balance is displayed.

> 💡 To understand transfer events on a deeper level check out [Alchemy's Transfers API](https://docs.alchemy.com/reference/transfers-api-quickstart)

## 🏁 Your Goal: Transfer Event

Create an event called `Transfer` which takes three arguments in the following order:

1. The `address` that sent the token
2. The `address` that received the token
3. The `uint256` value amount of the token sent
4. 
Then, emit the event from inside the transfer function with all the appropriate arguments.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
