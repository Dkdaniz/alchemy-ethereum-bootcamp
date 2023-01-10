# ECDSA Node

The best way to deeply understand blockchain is to put yourself into development mode. What would it be like to build your own blockchain? Let's start by applying our knowledge of hashes and digital signatures to our very first project: **`ECDSA Node`**.

In this project you'll have a simple react front-end which will communicate with a single server. This server will be responsible for transferring balances between accounts. Since it's a single server, it is centralized, so we'll need to trust that the server operator is not malicious for this exercise (more on this later!).

## 🏁 Your Goal: ECDSAYour Goal: ECDSA

This project begins with a client that is allowed to transfer any funds from any account to another account. That's not very secure. By applying digital signatures we can require that only the user with the appropriate private key can create a signature that will allow them to move funds from one account to the other. Then, the server can verify the signature to move funds from one account to another.

1. Incorporate Public Key Cryptography so transfers can only be completed with a valid signature
2. The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds

> 🤔 While you're working through this project consider the security implications of your implementation decisions. What if someone intercepted a valid signature, would they be able to replay that transfer by sending it back to the server?

### Written Instructions

For this project, you're going to be doing local development (instead of using our in-house IDE). This means you'll need a few extra things to set up:

1. Download a code editor if you don't already have one we recommend using VSCode, however feel free to choose whichever editor you prefer
2. Clone this repository locally: https://github.com/alchemyplatform/ecdsa-node by running the following command from your command-line:

> git clone git@github.com:alchemyplatform/ecdsa-node.git

3. Follow the readme instructions to learn how to run the project. Make sure to run the client and server as two separate processes!

Once you get up and running you'll notice a few components that we're given to start:

1. Wallet addresses - there are three pre-defined wallet addresses and balances in our server `index.js` file
2. The lefthand side of the UI shows us our wallet and account balance
3. he righthand side of the UI is where we can send an amount to a specified wallet address

### Tips

We're going to be incorporating the concepts we learned from this week into the final project. Here are a few resources you'll find helpful when working on this project:

Public Key Exercises in the Digital Signatures lesson (Recover Keys, Sign Message, Hash Messages)
The [Ethereum Cryptography library](https://github.com/ethereum/js-ethereum-cryptography) - specifically [random private key generation](https://github.com/ethereum/js-ethereum-cryptography#secp256k1-curve)

### Optimal Solutions

As with all open-ended projects, there are multiple solutions we can build here, a few are better than others. We recommend watching the [video walkthrough](https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4) to understand what the optimal solutions are and tradeoffs that come with each path.
