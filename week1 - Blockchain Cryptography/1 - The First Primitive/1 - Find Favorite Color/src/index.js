const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

function findColor(hash) {
    const colorIndex = COLORS.findIndex(color => toHex(sha256(utf8ToBytes(color))) === toHex(hash))
    return COLORS[colorIndex]
}

module.exports = findColor;