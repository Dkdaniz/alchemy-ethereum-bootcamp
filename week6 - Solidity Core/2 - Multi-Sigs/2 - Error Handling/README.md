# Error Handling

Great! We've setup the owners and required signatures. ✍️

Now, what if the deployer of the contract makes a mistake during deployment? 😨

When developing a user friendly contract we should be validating user inputs for common sources of error. We should definitely be checking the owners and signatures to ensure situations do not occur where the funds are immediately locked. 🔏

These situations include deploying **`no owner addresses`** and when the number of signatures is **`zero`** or **`more than`** the **`number of owners`**.

## 🏁 Your Goal: Handle Constructor Mistakes

Let's revert the deployment transaction in the following situations:

1. No owner addresses are sent.
2. Number of required confirmations is zero.
3. Number of required confirmations is more than the total number of owner addresses.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
