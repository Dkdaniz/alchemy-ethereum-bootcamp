const ganache = require("ganache-core");

const promisfy = require("./promisfy");

const provider = ganache.provider();

provider.send = promisfy(provider.send);

module.exports = provider;