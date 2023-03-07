require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { assert } = require('chai');

describe('api key', () => {
    it('should be a valid api key', async () => {
        const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;
        const address = "0x3bfc20f0b9afcace800d73d2191166ff16540258";

        const { data: { result } } = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [address, "latest"],
        });

        assert.isAbove(parseInt(result), 0x40db451e4e74a0311e90);
    });
});