const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction)
}

function mine() {
    const blocksSize = blocks.length;
    const newBlock = {id: blocksSize, nonce:0}

    const oldMempool = [...mempool];

    const transactions = oldMempool.filter((tx, index) => {
        if(index < MAX_TRANSACTIONS){
            mempool.shift();
            return tx;
        }
    })

    newBlock.transactions = transactions;

    while(BigInt(`0x${SHA256(JSON.stringify(newBlock))}`) > TARGET_DIFFICULTY){
        newBlock.nonce += 1
    }

    const blockHash = SHA256(JSON.stringify(newBlock))
   
    newBlock.hash = blockHash;
    
    blocks.push(newBlock)
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};