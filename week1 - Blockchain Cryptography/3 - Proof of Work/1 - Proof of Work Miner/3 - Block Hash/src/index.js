const SHA256 = require('crypto-js/sha256');

const mempool = [];
const blocks = [];

function mine() {
    const blocksSize = blocks.length;
    const newBlock = {id: blocksSize}

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
    blocks
};