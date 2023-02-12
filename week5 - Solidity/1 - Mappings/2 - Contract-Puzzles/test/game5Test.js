const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }

  beforeEach(async function () {
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;

    let addrFound = false
    let addr1;
  
    while (addrFound === false) {
      const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      const address = await wallet.getAddress();

      if (threshold > address) {
        addrFound = true
        addr1 = wallet;

        const signer = ethers.provider.getSigner(0);
        await signer.sendTransaction({
          to: address,
          value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
        });
      }

      this.addr1 = addr1;
    }
  })

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    await game.connect(this.addr1).win();
  
    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
