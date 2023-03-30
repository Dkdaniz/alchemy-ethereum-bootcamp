# How to Mint NFTs

In this guide, we'll be setting up a Hardhat repo to mint an NFT and then run a script to send it to a pre-defined list of public addresses - those of your friends or any random ones if you want!

## Step 1: Set Up Project Structure Using Hardhat

1. Clone this repository locally: https://github.com/ChainShot/MintNFT
2. Open this project up in your IDE of choice
3. Create a `.env` file at the top-level of the project
4. Open the `.env` file and add in a `GOERLI_URL`. You can retrieve your API url from the Alchemy Dashboard.
5. Add a `PRIVATE_KEY` from a test Goerli account that holds Goerli ETH. You can grab Goerli ETH from the Goerli Faucet.
   
Your `.env` should look like this:

```
GOERLI_URL=https://eth-goerli.g.alchemy.com/v2/---
PRIVATE_KEY=---
```

> 🧐 Remember, these `.env` variables are used in the `hardhat.config.js` file, so if you run into any errors make sure you are naming them correctly!

Project setup done! Let's customize it for our own NFT and our own friends now.

## Step 2: Storing Metadata

It's time to store metadata on IPFS!

1. First, install IPFS: https://ipfs.tech/#install (either the CLI or desktop app is fine, we recommend checking out the desktop app!)
2. Upload your image by clicking on "FILES" and then "+ Import":
   
<img src=".../../../../../img/ipfs.png">

2. Click on the image and click "... More".
3. Click "Share link" to get a URL you can use to access your image on the web. Try it out, put the URL in your browser bar and search.
4. Click "Copy CID" to get the content identifier for your NFT image.
5. Next let's upload metadata! You'll create a JSON file representing the standard NFT metadata and store it on IPFS. Let's do this programmatically!
6.Open up the file ipfs/deploy.js, complete the TODOs to add your NFT image CID and add whichever attributes you desire!

Once you are happy with your final NFT metadata and image...

7. Run `node ipfs/upload.js`

<img src=".../../../../../img/ipfs_code.png">

You will see a new `CID` output on the terminal. This is the CID to your metadata! You will need it for the Step #4 when we mint your NFT. Copy this CID
Go to your IPFS client you should find your metadata listed on the FILES tab!

## Step 3: Create your NFT Contract

Now it's time to actually deploy our ERC-721 contract from which we will mint our NFTs to ourselves and our friends - the possibilities are endless!

1. Take a look at the contracts/MyToken.sol file.
2. Customize your NFT. You can rename the contract, token name and token symbol!
3. In the scripts folder, open up the file deploy.js.
4. Modify this file to use the CID from your token metadata and the correct contract name.
5. Save the file.
   
Now, we are ready to deploy our ERC-721 contract!

6. To deploy, run `npx hardhat run scripts/deploy.js --network goerli`
7. 
If that runs successfully, you will have minted yourself an NFT! Take a look on [Goerli Etherscan](https://goerli.etherscan.io/) or [OpenSea Testnet](https://testnets.opensea.io/) to see if you can find your NFT 😃

Sometimes it can take a little while for IPFS to discover your metadata. You may need to tell OpenSea to refresh your metadata when it becomes available on the IPFS network. You can also try a pinning service like Pinata!