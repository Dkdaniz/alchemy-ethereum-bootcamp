# Structs

With structs we can create custom types in Solidity that are essentially groupings of variables.

For instance:

```solidity
enum Directions { Up, Down, Left, Right }

struct Hero {
    Directions facing;
    uint health;
    bool inAir;
}
```

☝️ With this struct we can create new heroes which contain just these three properties.

We can create a new Hero by invoking the struct with parenthesis:

```solidity
Hero hero = Hero(Directions.Up, 100, true);
```

Then we can use the `.` operator to retrieve values from the hero:

```solidity
console.log(hero.facing == Directions.Up); // true
console.log(health); // 100
console.log(inAir); // true
```

> 🔍 Notice that the order of the parameters matters when creating a new struct, we could have also named the properties instead.

## 🏁 Your Goal: Remove Members

1. Create a new struct called `Vote` that contains two properties: a `Choices choice` and an `address voter`.
2. Then create a public state variable called `vote` which is of the `Vote` type.
3. Finally, in the `createVote` function create a new instance of `Vote` and store it in the state variable `vote`. Use the `choice` passed in as an argument and the `msg.sender` for the vote properties.

## 🧪 Run Test
Access this path in your terminal and run the following command:

```bash
yarn test
```
or

```bash
yarn hardhat test ./src/test.js
```