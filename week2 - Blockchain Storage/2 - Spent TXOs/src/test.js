const { assert } = require('chai');

const Transaction = require('./Transaction');
const TXO = require('./TXO');

describe('Transaction', function () {
    const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

    describe('with unspent input TXOs', () => {
        const inputTXO1 = new TXO(fromAddress, 5);
        const inputTXO2 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 10);
        const tx = new Transaction([inputTXO1, inputTXO2], [outputTXO1]);

        it('should execute without error', () => {
            try {
                tx.execute();
            }
            catch(ex) {
                assert.fail(ex.message);
                console.log(ex);
            }
        });
    });

    describe('with a spent input TXO', () => {
        const txo1 = new TXO(fromAddress, 5);
        const txo2 = new TXO(fromAddress, 5);
        const txo3 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 15);

        txo2.spend();

        const tx = new Transaction([txo1, txo2, txo3], [outputTXO1]);

        it('should throw an error on execute', () => {
            let ex;
            try {
                tx.execute();
            }
            catch (_ex) {
                ex = _ex;
            }
            assert(ex, "Did not throw an exception with a spent input TXO!");
        });
    });
});