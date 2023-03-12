const { assert } = require('chai');
const { parseEther } = ethers.utils;

describe('Party', () => {
    const deposit = parseEther("2");

    let a1;
    beforeEach(async () => {
        a1 = await ethers.provider.getSigner(0);
        const Party = await ethers.getContractFactory('Party');
        contract = await Party.deploy(deposit);
    });

    it('should allow someone to RSVP who paid exactly the amount', async () => {
        await contract.connect(a1).rsvp({ value: deposit });
        const contractBalance = await ethers.provider.getBalance(contract.address);
        assert(contractBalance.eq(deposit));
    });

    it('should not allow someone to RSVP with less than the deposit', async () => {
        let ex;
        try {
            await contract.connect(a1).rsvp({ value: parseEther("1") });
        }
        catch (_ex) {
            ex = _ex;
        }
        assert(ex, "Only paid 1 ether for an RSVP requiring a 2 ether deposit. Expected transaction to revert!");
    });

    it('should not allow someone to RSVP with more than the deposit', async () => {
        let ex;
        try {
            await contract.connect(a1).rsvp({ value: parseEther("3") });
        }
        catch (_ex) {
            ex = _ex;
        }
        assert(ex, "Paid 3 ether for an RSVP requiring a 2 ether deposit. Expected transaction to revert!");
    });

    it('should not allow someone to RSVP who paid the deposit twice', async () => {
        let ex;
        await contract.connect(a1).rsvp({ value: deposit });
        try {
            await contract.connect(a1).rsvp({ value: deposit });
        }
        catch (_ex) {
            ex = _ex;
        }
        assert(ex, "Attempted to pay the deposit twice from the same account. Expected transaction to revert!");
    });
});