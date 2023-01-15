const hashMessage = require("./hashMessage");
const secp = require("ethereum-cryptography/secp256k1");

async function recoverKey(message, signature, recoveryBit) {
    const publicKey = await secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);

    return publicKey;
}

module.exports = recoverKey;