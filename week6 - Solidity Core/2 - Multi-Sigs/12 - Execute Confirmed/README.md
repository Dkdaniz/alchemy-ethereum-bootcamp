# Immediate Execution

Currently someone must call `executeTransaction` in order for the transaction to be executed. Once the transaction has reached it's necessary number of signatures, we should immediately execute the transaction!

There's no sense in requiring the owner to make a separate call to the `executeTransaction` function after they confirmed the transaction and it has enough signatures.

## 🏁 Your Goal: Execute Confirmed

1. Let's invoke `executeTransaction` within `confirmTransaction`! Once the multi-sig has been confirmed by enough owners to meet the requirement, invoke the execution.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
