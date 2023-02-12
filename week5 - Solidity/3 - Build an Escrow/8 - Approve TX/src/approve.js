/**
 * Approves the Escrow, signed by the arbiter
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {ethers.types.Signer} arbiterSigner - the arbiter EOA
 * 
 * @return {promise} a promise of the approve transaction
 */
function approve(contract, arbiterSigner) {
    return contract.connect(arbiterSigner).approve();
}

module.exports = approve;