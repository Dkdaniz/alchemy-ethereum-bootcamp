/**
 * Find the `value` stored in the contract
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise which resolves with the `value`
*/
function getValue(contract) {
    return contract.value()
}

module.exports = getValue;