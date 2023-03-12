const fs = require('fs');
const { assert } = require('chai');

const errors = [
    "Make sure to declare a public uint for the transaction count!",
    "Make sure to declare a public mapping for the transactions!",
];

const jsonLoc = "./artifacts/src/MultiSig.sol/MultiSig.json";

const { abi } = JSON.parse(fs.readFileSync(jsonLoc).toString());

describe('MultiSig', function () {
    it('should define the transaction count', async function () {
        const transactionCount = abi.filter(x => x.name === 'transactionCount')[0];
        assert(transactionCount, errors[0]);
        assert.deepEqual(transactionCount.outputs.map(x => x.type), ['uint256']);
    });

    it('should define a transactions mapping or array', async function () {
        const transactions = abi.filter(x => x.name === 'transactions')[0];
        assert(transactions, errors[1]);
        assert.deepEqual(transactions.inputs.map(x => x.type), ['uint256']);
        assert.deepEqual(transactions.outputs.map(x => x.type), ['address', 'uint256', 'bool']);
    });
});