require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-etherscan');

require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.7.5',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './src',
    tests: './src'
  }
};
