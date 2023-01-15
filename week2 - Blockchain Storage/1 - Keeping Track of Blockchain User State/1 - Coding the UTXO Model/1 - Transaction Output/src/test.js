const { assert } = require('chai');
const TXO = require('./TXO');

describe('TXO', function () {
    const address = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const amount = 10;
    const txo = new TXO(address, amount);

    describe('constructor', () => {
        it('should set the owner', () => {
            assert.equal(txo.owner, address);
        });
        it('should set the amount', () => {
            assert.equal(txo.amount, amount);
        });
        it('should set spent to false', () => {
            assert.equal(txo.spent, false);
        });
    });

    describe('spend', () => {
        it('should set spent to true', () => {
            txo.spend();
            assert.equal(txo.spent, true);
        });
    });
});