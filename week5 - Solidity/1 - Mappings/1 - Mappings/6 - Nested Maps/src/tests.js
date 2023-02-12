const { assert } = require('chai');
const TYPES = {
    Unacquainted: 0,
    Friend: 1,
    Family: 2
}
describe('Contract', function () {
    let contract;
    let s1;
    let s2;
    let a1;
    let a2;
    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();

        s1 = ethers.provider.getSigner(0);
        s2 = ethers.provider.getSigner(1);
        a1 = await s1.getAddress();
        a2 = await s2.getAddress();
    });

    const getConnection = (x, y) => contract.connections(x, y).then(Number);

    it('should have a Unacquainted connection type from s1 => s2', async () => {
        assert.equal(await getConnection(a1, a2), TYPES.Unacquainted);
    });

    it('should have a Unacquainted connection type from s2 => s1', async () => {
        assert.equal(await getConnection(a2, a1), TYPES.Unacquainted);
    });

    describe('after connecting from both sides', () => {
        beforeEach(async () => {
            await contract.connect(s1).connectWith(a2, TYPES.Friend);
            await contract.connect(s2).connectWith(a1, TYPES.Friend);
        });

        it('should have a Friend connection type from s1 => s2', async () => {
            assert.equal(await getConnection(a1, a2), TYPES.Friend);
        });

        it('should have a Friend connection type from s2 => s1', async () => {
            assert.equal(await getConnection(a2, a1), TYPES.Friend);
        });
    });

    describe('after connecting from one side', () => {
        beforeEach(async () => {
            await contract.connect(s1).connectWith(a2, TYPES.Family);
        });

        it('should have a Family connection type from s1 => s2', async () => {
            assert.equal(await getConnection(a1, a2), TYPES.Family);
        });

        it('should have a Unacquainted connection type from s2 => s1', async () => {
            assert.equal(await getConnection(a2, a1), TYPES.Unacquainted);
        });
    });
});