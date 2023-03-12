const { assert } = require('chai');
const { parseEther } = ethers.utils;

describe('Party', () => {
    let friends, venue, contract, initialVenueBalance;
    let previousBalances = [];
    beforeEach(async () => {
        const signers = await ethers.getSigners();
        friends = signers.slice(1, 5);
        venue = signers[6];

        const Party = await ethers.getContractFactory('Party');
        contract = await Party.deploy(parseEther("2"));
        for (let i = 0; i < friends.length; i++) {
            await contract.connect(friends[i]).rsvp({
                value: parseEther("2"),
            });
            previousBalances[i] = await ethers.provider.getBalance(friends[i].address);
        }
        initialVenueBalance = await ethers.provider.getBalance(venue.address);
    });

    describe('for an eight ether bill', () => {
        const bill = parseEther("8");
        beforeEach(async () => {
            await contract.payBill(venue.address, bill);
        });

        it('should pay the bill', async () => {
            const balance = await ethers.provider.getBalance(venue.address);
            assert.equal(balance.toString(), initialVenueBalance.add(bill));
        });

        it('should refund nothing', async () => {
            for (let i = 0; i < 4; i++) {
                const balance = await ethers.provider.getBalance(friends[i].address);
                assert.equal(balance.toString(), previousBalances[i].toString());
            }
        });
    });

    describe('for a four ether bill', async () => {
        const bill = parseEther("4");
        beforeEach(async () => {
            await contract.payBill(venue.address, bill);
        });

        it('should pay the bill', async () => {
            const balance = await ethers.provider.getBalance(venue.address);
            assert.equal(balance.toString(), initialVenueBalance.add(bill));
        });

        it('should only have cost one ether each', async () => {
            for (let i = 0; i < 4; i++) {
                const balance = await ethers.provider.getBalance(friends[i].address);
                const expected = previousBalances[i].add(parseEther("1")).toString();
                assert.equal(balance.toString(), expected);
            }
        });
    });

    describe('for a two ether bill', async () => {
        const bill = parseEther("2");
        beforeEach(async () => {
            await contract.payBill(venue.address, bill);
        });

        it('should pay the bill', async () => {
            const balance = await ethers.provider.getBalance(venue.address);
            assert.equal(balance.toString(), initialVenueBalance.add(bill));
        });

        it('should only have cost .5 ether each', async () => {
            for (let i = 0; i < 4; i++) {
                const balance = await ethers.provider.getBalance(friends[i].address);
                const expected = previousBalances[i].add(parseEther("1.5")).toString();
                assert.equal(balance.toString(), expected);
            }
        });
    });
});
