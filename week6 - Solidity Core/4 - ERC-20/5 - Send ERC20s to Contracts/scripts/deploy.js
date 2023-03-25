const { ethers } = require("hardhat");

const ERC20_ABI_JSON = require("../artifacts/contracts/Token.sol/Token.json");

const BUCKET_CONTRACT_ADDRESS= "0x873289a1aD6Cf024B927bd13bd183B264d274c68";
const BUCKET_ABI_JSON = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "Winner", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "erc20", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "drop", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const VALUE_DROP_AMOUNT = "100";

async function deployContract(signer) {
  console.log("Deploying contracts with the account:", signer.address);

  const weiAmount = (await signer.getBalance()).toString();

  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  console.log("Token address:", token.address);

  return token;
}

function getContractInstance(signer, addressContract, isERC20) {
  const interfaceToken = new ethers.utils.Interface(isERC20 ? ERC20_ABI_JSON.abi : BUCKET_ABI_JSON);
  const abiHuman = interfaceToken.format(ethers.utils.FormatTypes.full)

  return new ethers.Contract(addressContract, abiHuman, signer);
}

async function main(tokenContractAddress) {
  const [signer] = await ethers.getSigners();

  console.log(`Signer Wallet is: ${signer.address}`);

  try {
    const erc20 = tokenContractAddress ? getContractInstance(signer, tokenContractAddress, true) : await deployContract(signer);
    const bucket = getContractInstance(signer, BUCKET_CONTRACT_ADDRESS, false);

    const txERC20 = await erc20.approve(BUCKET_CONTRACT_ADDRESS, ethers.utils.parseUnits(VALUE_DROP_AMOUNT, 18))
    txERC20.wait(1);

    const txBucket = await bucket.drop(erc20.address, ethers.utils.parseUnits(VALUE_DROP_AMOUNT, 18))
    txBucket.wait(1);

  } catch (error) {
    console.log(error)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });