const { assert } = require('chai');
describe("Token", () => {
    let token;
    let owner;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();

        const accounts = await ethers.provider.listAccounts();
        owner = accounts[0];
    });

    describe('ERC20 Standard', () => {
        context('balanceOf', () => {
            it('should return zero for any account', async () => {
                const balance = await token.callStatic.balanceOf(owner);
                assert.equal(balance.toString(), '0');
            });
        });

        context('totalSupply', () => {
            it('should return zero', async () => {
                const result = await token.callStatic.totalSupply();
                assert.equal(result.toString(), '0');
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