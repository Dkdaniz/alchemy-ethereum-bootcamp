// import testing libraries: https://www.chaijs.com/guide/styles/ 
const { expect } = require("chai");

describe("Test Call Function Attempt of Winner Contract", function () {
  let winnerContract;
  beforeEach(async () => {
    const Winners = await ethers.getContractFactory("Winners");
    const winners = await Winners.deploy();

    winnerContract = await winners.deployed();
  });

  it("should invoke Winner event", async function () {
    const Contract = await ethers.getContractFactory("Contract");
    const contract = await Contract.deploy();
    const instanceContract = await contract.deployed();

    await expect(instanceContract.callAttempt(winnerContract.address)).to.emit(winnerContract, "Winner")
  });
});
