const { assert } = require('chai');

describe('Chest', function () {
    let coinCreator, coinCreatorSigner, hunter, hunterSigner; 

    describe('storing erc20 tokens', () => {
        let token1;
        let token2;
        let chest;
        beforeEach(async () => {
            const ERC20 = await ethers.getContractFactory("ERC20FixedSupply");
            
            token1 = await ERC20.deploy(10000);
            await token1.deployed();

            token2 = await ERC20.deploy(10000);
            await token2.deployed();

            const Chest = await ethers.getContractFactory("Chest");
            chest = await Chest.deploy();
            await chest.deployed();

            const accounts = await ethers.provider.listAccounts();
            coinCreator = accounts[0];
            coinCreatorSigner = ethers.provider.getSigner(coinCreator);
            hunter = accounts[1];
            hunterSigner = ethers.provider.getSigner(hunter);
        });

        describe('storing some token1', () => {
            beforeEach(async () => {
                await token1.connect(coinCreatorSigner).transfer(chest.address, 1000);
            });

            it('should let us store token1 at the address', async () => {
                const balance = await token1.balanceOf(chest.address);
                assert.strictEqual(balance.toString(), '1000');
            });

            describe('after plundering', () => {
                beforeEach(async () => {
                    await chest.connect(hunterSigner).plunder([token1.address]);
                });

                it('should award the hunter the balance', async () => {
                    const hunterBalance = await token1.balanceOf(hunter);
                    assert.strictEqual(hunterBalance.toString(), '1000');
                });

                it('should remove the balance from the chest', async () => {
                    const balance = await token1.balanceOf(chest.address);
                    assert.strictEqual(balance.toString(), '0');
                });
            });
        });

        describe('storing some token1 and token2', () => {
            beforeEach(async () => {
                await token1.connect(coinCreatorSigner).transfer(chest.address, 250);
                await token2.connect(coinCreatorSigner).transfer(chest.address, 300);
            });

            it('should let us store token1 at the address', async () => {
                const balance = await token1.balanceOf(chest.address);
                assert.strictEqual(balance.toString(), '250');
            });

            it('should let us store token2 at the address', async () => {
                const balance = await token2.balanceOf(chest.address);
                assert.strictEqual(balance.toString(), '300');
            });

            describe('after pludering token2', () => {
                beforeEach(async () => {
                    await chest.connect(hunterSigner).plunder([token2.address]);
                });

                it('should not award the hunter the token1', async () => {
                    const hunterBalance = await token1.balanceOf(hunter);
                    assert.strictEqual(hunterBalance.toString(), '0');
                });

                it('should award the hunter the token2', async () => {
                    const hunterBalance = await token2.balanceOf(hunter);
                    assert.strictEqual(hunterBalance.toString(), '300');
                });

                it('should not remove the token1 from the chest', async () => {
                    const balance = await token1.balanceOf(chest.address);
                    assert.strictEqual(balance.toString(), '250');
                });

                it('should remove the token2 from the chest', async () => {
                    const balance = await token2.balanceOf(chest.address);
                    assert.strictEqual(balance.toString(), '0');
                });
            });

            describe('upon plundering both', () => {
                beforeEach(async () => {
                    await chest.connect(hunterSigner).plunder([token1.address, token2.address]);
                });

                it('should award the hunter the token1', async () => {
                    const hunterBalance = await token1.balanceOf(hunter);
                    assert.strictEqual(hunterBalance.toString(), '250');
                });

                it('should award the hunter the token2', async () => {
                    const hunterBalance = await token2.balanceOf(hunter);
                    assert.strictEqual(hunterBalance.toString(), '300');
                });

                it('should remove the token1 from the chest', async () => {
                    const balance = await token1.balanceOf(chest.address);
                    assert.strictEqual(balance.toString(), '0');
                });

                it('should remove the token2 from the chest', async () => {
                    const balance = await token2.balanceOf(chest.address);
                    assert.strictEqual(balance.toString(), '0');
                });
            });
        });
    });
});
