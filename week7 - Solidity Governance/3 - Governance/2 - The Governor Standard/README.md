# ERC20 Governor
In this guide, we're going to talk about using an ERC20 for governance. The token will have two purposes:

1. It will be the token used for voting weight in our Governor contract.
2. It will have a `mint` function which can only be called when a proposal from the token holders has been successfully executed.

## Governor Repository

To follow along, clone this repository: [MintGovernance](https://github.com/ChainShot/MintGovernance).

In this repository, you'll find two contracts:

1. **`MyGovernor`** - a contract built from the openzeppelin governor wizard. This Governor is configured to have a `1 block` voting delay and voting period. To make things simpler it does not include a Timelock, although it should be noted that this is standard practice in governance.
2. **`MyToken`** - a token which is built to work together with the governor standard. You can re-create it by toggle the Votes checkbox on the openzeppelin erc20 wizard.

### Setup

1. Once you clone the repository, you can run `npm i` to install all the depedencies
2. Then, you can run `npx hardhat test` to run the unit tests
3. You should see all test cases passing
   
Let's take a look at the [unit tests in the repository](https://github.com/ChainShot/MintGovernance/blob/main/test/MyGovernor.js), what are they doing? Let's break it down step by step.

#### 1. Deployment

This first section is being used to deploy the contracts:

```javascript
const transactionCount = await owner.getTransactionCount();

// gets the address of the token before it is deployed
const futureAddress = ethers.utils.getContractAddress({
  from: owner.address,
  nonce: transactionCount + 1
});

const MyGovernor = await ethers.getContractFactory("MyGovernor");
const governor = await MyGovernor.deploy(futureAddress);

const MyToken = await ethers.getContractFactory("MyToken");
const token = await MyToken.deploy(governor.address);
```

☝️ First we need to deploy the `MyGovernor` and `MyToken` contracts. This looks pretty standard, except for the piece where we need to calculate the `futureAddress` and provide it to `MyGovernor` on deployment. Let's talk about that part.

When deploying contracts you'll often find yourself in situation where one contract needs to know the other contract's address on deployment **`and vice-versa`**. With our setup, this makes sense because the governor contract depends on the token for voting and the token depends on the governance for its mint function.

To get around this issue we calculate the address of the token contract ahead of time. We can do this because contract addresses are deterministic. They are the keccak hash of the address deploying the contract and the nonce for that particular address. You can see those are the two parameters that ethers is requiring us to pass in for the `getContractAddress` utility. We can, ahead of time, figure out what the contract address will be provided it is deployed in the following transaction.

#### 2. Delegation

This probably seems like a silly step, but when you're using token governance, its standard to delegate your votes to someone who can then use that voting power. In our case, the owner address receives 10000 tokens when they deploy the token and they want to delegate that voting power to themselves. So this transaction looks like this:

```javascript
await token.delegate(owner.address);
```
The owner is delegating the weight of 10000 tokens to themselves to vote with.

#### 3. Proposing

Once we are ready, we can make a new proposal on the governance system. We could encode any kind of call data or value on this proposal, and we can even specify multiple targets. In our case we're trying to mint an extra 25000 tokens to the owner:

```javascript
const tx = await governor.propose(
  [token.address],
  [0],
  [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
  "Give the owner more tokens!"
);
const receipt = await tx.wait();
const event = receipt.events.find(x => x.event === 'ProposalCreated');
const { proposalId } = event.args;
```

☝️ Here we create a proposal to mint 25000 tokens to the owner (by using `parseEther` here we're taking advantage of the fact that the ERC20 token uses 18 decimals, just like ether). In order to lookup the state of the proposal and vote, we need the proposalId which is something that is emitted when the proposal is created. We grab the proposalId out of the event arguments.

We also need to wait for the block voting delay:
```javascript
// wait for the 1 block voting delay
await hre.network.provider.send("evm_mine");
```

In our case we just need to wait one block before we can start voting on the proposal. This is something you can configure using the [OpenZeppelin Governor Wizard](https://wizard.openzeppelin.com/#governor)

#### 4. Vote on the Proposal
As the owner with 10000 tokens we have the executive power to push this proposal through. Let's go ahead and vote on this proposal so we can execute it:

```javascript
const tx = await governor.castVote(proposalId, 1);   
```
   
This transaction will cast a vote as the owner with a weight of 10000 tokens. This will be enough for the vote to be successful! Normally, the next step would be to queue this proposal in the Timelock to wait for some period before execution. In this case, we're not using a Timelock so we can go ahead and execute this proposal after the voting period has ended.

#### 5. Execute the Vote

The `execute` function looks up the proposal by hashed parameters, so we'll need to pass in our parameters here again for it to go look them up:

```javascript
await governor.execute(
  [token.address],
  [0],
  [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
  keccak256(toUtf8Bytes("Give the owner more tokens!"))
);
```

This will execute our proposal! If successful, the owner should now have 35000 tokens because the governance proposal will target the ERC20 token and pass in the calldata to mint 25000 tokens. Amazing! 🤩

## 🏁 Your Goal: Govern on Goerli

We just walked through the entire flow in the unit test cases and can see how the governor standard works. Your goal is to now get this deployed and executed on the Goerli test network. You can do this by:

1. Add a Goerli URL and private key to the hardhat config ([here's the hardhat config docs](https://hardhat.org/hardhat-runner/docs/config)) so that you can interact with the test network through Hardhat.
2. e-configure `MyGovernor` to use a different voting period. A 1 block waiting period works for unit tests, but it would be too quick on goerli. This is the second argument passed to `GovernorSettings`. See the[ OpenZeppelin Wizard](https://wizard.openzeppelin.com/#governor) on how this is configured.
3. Once you've setup your goerli network, use the `scripts/deploy.js` script by running` npx hardhat run scripts/deploy.js --network goerli`. This should deploy the two contracts.
4. You'll need to build several more scripts to run through steps 2-5 above. Be sure to:
   
- delegate the votes to yourself
- create a proposal
- vote on the proposal
- execute the proposal

When you are building the scripts to run through governance, make use of the `ethers.getContractAt` method which will allow you to specify a contract name and where it is deployed. This way you can build scripts that interact with the existing `MyGovernor` and `MyToken` contracts after you've deployed them.

> ⛽ Be sure to use the [Goerli Faucet](https://goerlifaucet.com/) if you need some test ether!