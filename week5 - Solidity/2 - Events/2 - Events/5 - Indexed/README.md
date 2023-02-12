# Indexed

We can make it easy to filter on event arguments by adding an indexed keyword:

event HighScore(address indexed player);
Now we can filter for both the HighScore event as well as the address of the player.

🔍 Let's take a closer look in details.

## 🏁 Your Goal: Index the Addresses

Modify all the `address` data types in the events to be indexed.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```