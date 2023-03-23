const { ethers } = require("hardhat");

const abiJson = require("../assets/abi.json");

function getRandomInt(max) {
  return Math.floor((Math.random() * max) + 1);
}

async function airdrop(contractInstance, addresses, amounts) {
  console.log(`Executing Airdrop for address: ${addresses} and amounts: ${amounts}`);

  if (addresses.length === 0 && amounts.length === 0 && addresses.length !== amounts.length) {
    throw new Error('airdrop could not be executed, invalid parameters');
  }

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    const amount = amounts[i];

    console.log(contractInstance)

    const tx = await contractInstance.transfer(address, amount);
    const { hash } = await tx.wait();

    console.log(hash);
  }1
}

async function deployContract(signer) {
  console.log("Deploying contracts with the account:", signer.address);

  const weiAmount = (await signer.getBalance()).toString();

  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  console.log("Token address:", token.address);

  return token;
}

function getContractInstance(signer, addressContract) {
  const interfaceToken = new ethers.utils.Interface(abiJson.abi);
  const abiHuman = interfaceToken.format(ethers.utils.FormatTypes.full)

  return new ethers.Contract(addressContract, abiHuman, signer);
}

async function main(numWalletAirdrop, contractAddress) {
  const [signer] = await ethers.getSigners();

  console.log(`Signer Wallet is: ${signer.address}`);

  if (numWalletAirdrop === 0) return console.log('numWalletAirdrop cannot be zero');
  if (process.env.SEED_AIRDROP_WALLETS === '') return console.log('Seed dont was provides');

  const contractInstance = contractAddress ? getContractInstance(signer, contractAddress) : await deployContract(signer);

  try {
    console.log("Generate random amounts");

    const addresses = []
    const amounts = [];

    for (let i = 0; i < numWalletAirdrop; i++) {
      const walletMnemonic = ethers.Wallet.fromMnemonic(process.env.SEED_AIRDROP_WALLETS, `m/44'/60'/0'/0/${i}`)
      addresses.push(walletMnemonic.address)

      const amount = ethers.utils.parseUnits(getRandomInt(200).toString()).toString()
      amounts.push(amount)
    }

    await airdrop(contractInstance, addresses, amounts);

  } catch (error) {
    console.log(error)
  }
}


// deploy and airdrop
// main(NUM_WALLET);

// only airdrop without deploy
// main(NUM_WALLET, ADDRESS_CONTRACT);

main(5)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });