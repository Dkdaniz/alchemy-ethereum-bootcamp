const { assert } = require('chai');
describe("Token", () => {
    const totalSupply = ethers.utils.parseEther("1000");
    let token;
    let owner, a1;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();

        const accounts = await ethers.provider.listAccounts();
        owner = accounts[0];
        a1 = accounts[1];
    });

    describe('ERC20 Standard', () => {
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