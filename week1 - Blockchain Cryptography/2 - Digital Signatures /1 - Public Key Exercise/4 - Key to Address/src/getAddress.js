const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const hashKey = keccak256(publicKey.slice(1, publicKey.length))
    const key = hashKey.slice(-20);

    return key
}

module.exports = getAddress;