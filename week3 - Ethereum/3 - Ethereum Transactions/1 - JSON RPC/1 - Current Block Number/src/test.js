const { assert } = require('chai');

const getBlockNumber = require('./getBlockNumber');
const provider = require('./provider');

describe('getBlockNumber', function () {
    it('should get the current block number', async () => {
        const blockNumber = await getBlockNumber();
         
        assert.equal(blockNumber, 0);
    });

    describe('after mining a block', () => {
        before(() => {
            return provider.send({ id: 1, jsonrpc: "2.0", method: "evm_mine" });
        });

        it('should get the latest block number', async () => {
            const blockNumber = await getBlockNumber();
            assert.equal(blockNumber, 1);
        });
    });
});