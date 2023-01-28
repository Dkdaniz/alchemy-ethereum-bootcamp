/**
 * Set the message on the contract using the signer passed in
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {ethers.types.Signer} signer - ethers.js signer instance
 * @return {promise} a promise of transaction modifying the `message`
 */
function setMessage(contract, signer) {
    return contract.connect(signer).modify('message modify')
}

module.exports = setMessage;