# Batch Transactions

Have you noticed the id property on all of our JSON-RPC requests? This property is used when batching requests. If we want to make several different remote procedure calls, we can do them all at once and receive responses for each one. The id will tell us which response corresponds to which request.

For example:

```js
const request1 = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_blockNumber",
}

const request2 = {
    jsonrpc: "2.0",
    id: 2,
    method: "net_version"
}

const response = await axios.post(url, [request1, request2]);

console.log(response.data);
/* 
    [ 
        { id: 1, jsonrpc: '2.0', result: '0x0' }, 
        { id: 2, jsonrpc: '2.0', result: '0xb1a2bc2ec50000' } 
    ] 
*/
```

☝️ Here we are able to batch `request1` and `request2` together so that we only make **`one HTTP call`** for both requests. The response comes back as an array of responses containing a result for each request with a corresponding id property.

## 🏁 Your Goal: Total Balance

The getTotalBalance method will receive an array of several addresses.

1. Take each address and find its ether balance
2. Add all of these balances together to find the total balance of all the addresses and return it
   
> 💡 You'll notice from the example above that the result is coming back as a hexadecimal string. You can use `parseInt('0xb1a2bc2ec50000')` method to convert hex values to integers in order to add them.

## 🧪 Run Test

Access this path in your terminal and run the following command:

```bash
yarn test
```

or

```bash
yarn mocha ./src/test.js
```
