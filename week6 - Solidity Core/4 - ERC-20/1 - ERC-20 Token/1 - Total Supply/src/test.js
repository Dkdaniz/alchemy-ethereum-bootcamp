const { assert } = require('chai');
describe("Token", () => {
    let token;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();
    });

    describe('ERC20 Standard', () => {
        context('totalSupply', () => {
            it('should return zero', async () => {
                const result = await token.callStatic.totalSupply();
                assert.equal(result.toString(), '0');
            });
        });
    });
});