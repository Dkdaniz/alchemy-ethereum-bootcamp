# Alchemy API Key

In this exercise, you'll need to grab your [Alchemy API](https://dashboard.alchemy.com/) Key so you can start making some JSON RPC Requests!

> 📖 An API key is a unique identifier that grants access to an API (Application Programming Interface). It acts as a secret token that allows the user to gain access to a set of methods.

When using your Alchemy API key, it's important to keep it safe and secure, so only your code can access your Alchemy Apps. For that reason, we'll be putting it in `.env` file. The `.env` file is a configuration file that is used to store environment variables in a project. Sometimes, these variables are sensitive and should not be kept with the source code of the project. Other times, they are simply variables that are different depending on the environment you're in (i.e. your local environment vs production).

> 🧐 We'll be making use of the dotenv module to load our environment variables. We recommend you follow this same practice in your own projects!

The format of a `.env` file is:

```env
KEY1=VALUE1
KEY2=VALUE2
```
Often times you'll see the values in quotes. This is only necessary if your value has a space in it like `"my value"`. Whitespace surrounding the value is not an issue in a `.env` file.

## 🏁 Your Goal: Fetch the key! 🔑

The goal of this stage is to fill in the .env file with your Alchemy API Key! When you do so, the test cases will attempt to make a request to your Alchemy endpoint. If it's successful, you'll pass the test cases! You'll need to:

1. Visit the [Alchemy Dashboard](https://dashboard.alchemy.com/). If it's your first time visiting the dashboard, you'll need to go through a sign up flow.
2. Once you're on the dashboard page, you'll need a mainnet app. If you don't have one, click "+Create App". Choose Ethereum as your Chain and Mainnet as your Network.
3. Click "View Key" on your Mainnet App and copy the API Key. Paste it into your `.env` as the value for the `API_KEY`.
4. Once you've pasted the API Key, run your code!

> 📖 Need help following the dashboard steps? Check out these pictures on the details tab.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
