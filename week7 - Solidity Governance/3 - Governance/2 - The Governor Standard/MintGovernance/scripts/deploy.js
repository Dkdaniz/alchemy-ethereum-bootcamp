const { ethers } = require("hardhat");

async function main() {
  const url = process.env.GOERLI_URL;
  const privateKey = process.env.PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(url);
  let owner = new ethers.Wallet(privateKey, provider);
  
  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  console.log(futureAddress)

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.connect(owner).deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.connect(owner).deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
