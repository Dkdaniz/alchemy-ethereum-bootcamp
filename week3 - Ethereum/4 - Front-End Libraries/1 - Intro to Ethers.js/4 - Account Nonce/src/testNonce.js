const { assert } = require('chai');
const ethers = require('ethers');

const { ganacheProvider } = require('./config');
const sendEther = require('./findMyBalance');

const provider = new ethers.providers.Web3Provider(ganacheProvider);
describe('sendEther', () => {
    before(async () => {
        const props = {
            value: ethers.utils.parseEther("1.0"),
            to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
        }
        await sendEther(props);
        await sendEther(props);
        await sendEther(props);
    });
    
    it('should have mined three blocks', async () => {
        const blockNumber = await provider.getBlockNumber();
        assert.equal(blockNumber, 3);
    });
});