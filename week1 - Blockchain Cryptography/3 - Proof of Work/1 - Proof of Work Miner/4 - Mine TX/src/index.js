const SHA256 = require('crypto-js/sha256');
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function mine() {
    const blocksSize = blocks.length;
    const newBlock = {id: blocksSize}

    const oldMempool = [...mempool];

    const transactions = oldMempool.filter((tx, index) => {
        if(index < MAX_TRANSACTIONS){
            mempool.shift();
            return tx;
        }
    })

    newBlock.transactions = transactions;

    const blockHash = SHA256(JSON.stringify(newBlock))
   
    newBlock.hash = blockHash;
    
    blocks.push(newBlock)
}

function addTransaction(transaction) {
    mempool.push(transaction)
}

module.exports = {
    addTransaction,
    mine,
    blocks,
    mempool,
    MAX_TRANSACTIONS
};