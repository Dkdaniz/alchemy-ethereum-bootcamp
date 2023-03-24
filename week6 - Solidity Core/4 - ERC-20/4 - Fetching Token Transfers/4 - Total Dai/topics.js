const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

function firstTopic() {
    const eventSignature = "Transfer(address,address,uint256)"; // <-- TODO #1: fill in the event signature!
    const bytes = utf8ToBytes(eventSignature);
    const digest = keccak256(bytes);
    return toHex(digest);
}

function secondTopic() {
    // TODO #2: add the address and left-pad it with zeroes to 32 bytes
    // then return the value
    const fullAddress = '0x28c6c06298d514db089934071355e5743bf21d60';
    const address = fullAddress.slice(2);

    const maxChar = 64 - address.length;
    const numberMissingChars = address.length + maxChar;

    const topicAddressParam = address.padStart(numberMissingChars, '0');

    return topicAddressParam;
}

module.exports = { firstTopic, secondTopic }