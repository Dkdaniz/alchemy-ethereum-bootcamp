# Hackathon Contract

To complete this challenge we need to write a function that will help us find the winning project of the hackathon. The winning project will be determined by the **`average score`** of all of its ratings.

> 🔍 The `Hackathon.sol` contract is partially setup already. Let's discuss the setup in details!

## 🏁 Your Goal: Find Winner Function

1. Create an external, view function `findWinner` which returns a `Project`.
   
2. In this function, use the projects storage array to find the project that has the **`highest average rating `**amongst its array of ratings.
   
3. Upon finding the highest average, return the project.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
