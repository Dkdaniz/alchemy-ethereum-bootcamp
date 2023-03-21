const { assert } = require('chai');
describe("Token", () => {
    const totalSupply = ethers.utils.parseEther("1000");
    let token;
    let owner, ownerSigner, a1, s1;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();

        const accounts = await ethers.provider.listAccounts();
        owner = accounts[0];
        ownerSigner = ethers.provider.getSigner(owner);
        a1 = accounts[1];
        s1 = ethers.provider.getSigner(a1);
    });

    describe('ERC20 Standard', () => {
        context('transfer', () => {
            describe('the owner transfers a value of 1 to the recipient', () => {
                beforeEach(async () => {
                    await token.connect(ownerSigner).transfer(a1, "1");
                });

                describe('first transfer', async () => {
                    it('should decrease the owner\'s balance by 1', async () => {
                        const balance = await token.callStatic.balanceOf(owner);
                        assert.equal(
                            balance.toString(),
                            totalSupply.sub("1").toString()
                        );
                    });

                    it('should increase the recipient\'s balance to 1', async () => {
                        const balance = await token.callStatic.balanceOf(a1)
                        assert.equal(balance.toString(), '1')
                    });
                });

                describe('second transfer', async () => {
                    beforeEach(async () => {
                        await token.connect(ownerSigner).transfer(a1, "1");
                    });

                    it('should decrease the owner\'s balance by 1', async () => {
                        const balance = await token.callStatic.balanceOf(owner)
                        assert.equal(
                            balance.toString(),
                            totalSupply.sub("2").toString()
                        );
                    });

                    it('should increase the recipient\'s balance by 1', async () => {
                        const balance = await token.callStatic.balanceOf(a1);
                        assert.equal(balance.toString(), '2');
                    });
                });
            });

            describe('transferring without the funds', () => {
                it('should not be allowed', async () => {
                    let ex;
                    try {
                        await token.connect(s1).transfer(owner, "1");
                    }
                    catch (_ex) {
                        ex = _ex;
                    }
                    assert(ex, "The account should not have any funds. Expected this transaction to revert!");
                });
            });
        });

        context('balanceOf', () => {
            it('should return zero for any address other than the contract creator', async () => {
                const balance = await token.callStatic.balanceOf(a1);
                assert.equal(balance.toString(), '0');
            });

            it('should return the total supply for the contract creator', async () => {
                const balance = await token.callStatic.balanceOf(owner);
                assert.equal(balance.toString(), totalSupply.toString());
            });
        });

        context('totalSupply', () => {
            it('should return zero', async () => {
                const result = await token.callStatic.totalSupply();
                assert.equal(result.toString(), totalSupply.toString());
            });
        });
    });

    describe('ERC20 Optional', () => {
        context('`name`', () => {
            it('should return the correct name', async () => {
                const name = await token.callStatic.name();
                assert.isAtLeast(name.length, 1);
            });
        });

        context('`symbol`', () => {
            it('should return the correct name', async () => {
                const sym = await token.callStatic.symbol();
                assert.equal(sym.length, 3);
            });
        });

        context('`decimals`', () => {
            it('should return the correct name', async () => {
                const decimals = await token.callStatic.decimals();
                assert.equal(decimals, 18);
            });
        });
    });
});