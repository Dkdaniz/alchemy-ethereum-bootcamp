const ganache = require("ganache-core");
const promisfy = require("./promisfy");
const PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";

// create our test account from the private key, initialize it with 10 ether
const accounts = [].concat([{
    balance: "10000000000000000000", // 10 ether
    secretKey: PRIVATE_KEY,
}]);

const provider = ganache.provider({ accounts });

provider.send = promisfy(provider.send);

module.exports = provider;