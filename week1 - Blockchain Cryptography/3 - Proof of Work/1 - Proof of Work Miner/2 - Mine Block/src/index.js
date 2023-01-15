const mempool = [];
const blocks = [];

function mine() {
    const blocksSize = blocks.length;
    const newBlock = {id: blocksSize};
    
    blocks.push(newBlock)
}

function addTransaction(transaction) {
    mempool.push(transaction)
}

module.exports = {
    addTransaction,
    mine,
    blocks
}