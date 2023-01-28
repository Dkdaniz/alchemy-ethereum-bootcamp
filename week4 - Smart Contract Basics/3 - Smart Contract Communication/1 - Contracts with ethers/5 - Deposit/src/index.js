const ethers = require('ethers');

/**
 * Deposit at least 1 ether into the contract 
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise of the deposit transaction 
 */
function deposit(contract) {
    return contract.deposit({ value: ethers.utils.parseUnits("1", "ether")})
}

module.exports = deposit;