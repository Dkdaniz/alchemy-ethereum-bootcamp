require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-etherscan');

require('dotenv').config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  }
};