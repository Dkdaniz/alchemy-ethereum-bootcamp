const { assert } = require('chai');
const transfer = require('./index');

describe('Token', function () {
    let contract;
    let owner;
    let friend;
    before(async () => {
        const accounts = await ethers.provider.listAccounts();
        owner = accounts[1];
        friend = accounts[2];
        
        const Contract = await ethers.getContractFactory("Token");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    describe('after transfer', () => {
        before(async () => {
            await transfer(contract, friend);
        });

        it('should decrease the owner balance', async () => {
            const balance = await contract.balances(owner);
            assert(balance.lt(1000));
        });

        it('should increase the friend balance', async () => {
            const balance = await contract.balances(friend);
            assert(balance.gt(0));
        });
    });
});
