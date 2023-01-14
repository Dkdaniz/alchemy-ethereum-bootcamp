const ganache = require("ganache-core");

const promisfy = require("./promisfy");

const privateKeys = [
    "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d",
    "0x636fe84c364a5d5a222c3651a49d0c243e7eaeb4b3745aa0ae1307ccf6f1ee01",
    "0xb262a68a6b50fc6bd90c8f85ede7fee3e77169a20b4baaada9d5ba5a6b0e602b",
    "0x309d6fae9d3c1f3d96764fbb7482feb733809fa0454077815cc55a60380e4d7e",
    "0xfcfa090d848b97a0b6fb86d5e40ed456323cc96cf61211e2016e24bb577e88e3"
]

const accounts = privateKeys.map((secretKey, i) => ({
    balance: (i + 1).toString().padEnd(18, "0"),
    secretKey
}));

const provider = ganache.provider({ accounts });

provider.send = promisfy(provider.send);

module.exports = provider;