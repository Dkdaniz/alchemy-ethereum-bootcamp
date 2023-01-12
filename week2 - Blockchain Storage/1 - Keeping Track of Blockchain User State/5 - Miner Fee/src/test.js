const { assert } = require('chai');

const Transaction = require('./Transaction');
const TXO = require('./TXO');

describe('Transaction', function () {
    const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

    describe('with no remainder', () => {
        const txo1 = new TXO(fromAddress, 5);
        const txo2 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 7);
        const outputTXO2 = new TXO(fromAddress, 3);

        const tx = new Transaction([txo1, txo2], [outputTXO1, outputTXO2]);

        tx.execute();

        it('should have zero fee', () => {
            assert.equal(tx.fee, 0);
        });
    });

    describe('with some remainder', () => {
        const txo1 = new TXO(fromAddress, 15);
        const outputTXO1 = new TXO(toAddress, 7);
        const outputTXO2 = new TXO(fromAddress, 6);

        const tx = new Transaction([txo1], [outputTXO1, outputTXO2]);

        tx.execute();

        it('should have the remainder as the fee', () => {
            assert.equal(tx.fee, 2);
        });
    });
});