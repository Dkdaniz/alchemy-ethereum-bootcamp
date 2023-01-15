const { assert } = require('chai');
const { utils } = require('ethers');

const signaturePromise = require('./sign');


describe('signaturePromise', () => {
    it('should be an instance of Promise', () => {
        assert(signaturePromise instanceof Promise);
    });

    it('should resolve with a hexidecimal representation of the transaction', async () => {
        const hex = await signaturePromise;
        const matches = /^0x[0-9A-Fa-f]*$/.test(hex);
        if(!matches) console.log(hex);
        assert(matches, 'did not match the expect hash output');
    });

    describe('parsed properties', () => {
        let parsed;
        before(async () => {
            const hex = await signaturePromise;
            parsed = utils.parseTransaction(hex);
        });

        it('should contain the to address', () => {
            assert.equal(parsed.to, "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92");
        });

        it('should contain the value', () => {
            assert.equal(parsed.value.toString(), "1000000000000000000");
        });

        it('should have the appropriate gas limit for transfers', () => {
            assert(parsed.gasLimit.eq(21000), "The gas limit should be 21000");
        });

        it('should derive the from address', () => {
            assert.equal(parsed.from, "0x5409ED021D9299bf6814279A6A1411A7e866A631");
        });
    });
});