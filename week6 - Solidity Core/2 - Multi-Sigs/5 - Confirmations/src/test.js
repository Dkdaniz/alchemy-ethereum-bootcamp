const fs = require('fs');
const { assert } = require('chai');

const jsonLoc = "./artifacts/src/MultiSig.sol/MultiSig.json";
const { abi } = JSON.parse(fs.readFileSync(jsonLoc).toString());
const error = "Make sure to declare a public uint for the confirmations!";
describe('MultiSig', function () {
    it('should define a confirmations mapping', async function () {
        const confirmations = abi.filter(x => x.name === 'confirmations')[0];
        assert(confirmations, error);
        assert.deepEqual(confirmations.inputs.map(x => x.type), ['uint256', 'address']);
        assert.deepEqual(confirmations.outputs.map(x => x.type), ['bool']);
    });
});