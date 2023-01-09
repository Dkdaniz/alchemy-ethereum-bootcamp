const mempool = [];

function addTransaction(transaction) {
    mempool.push(transaction)
}

module.exports = {
    addTransaction, 
};