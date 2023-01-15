const ganache = require("ganache-core");
const {utils} = require("ethers");

const PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const INITIAL_BALANCE_ACCOUNT = "10000000000000000000"

// create our test account from the private key, initialize it with 10 ether
const accounts = [].concat([{
    balance: INITIAL_BALANCE_ACCOUNT, // 10 ether
    secretKey: PRIVATE_KEY,
}]);

const ganacheProvider = ganache.provider({ accounts });

module.exports = {
    ganacheProvider,
    PRIVATE_KEY,
    INITIAL_BALANCE: utils.parseUnits(INITIAL_BALANCE_ACCOUNT, "wei"),
}
