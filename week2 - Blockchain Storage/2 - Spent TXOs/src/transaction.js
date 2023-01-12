class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.transaction = { inputUTXOs, outputUTXOs}
    }
    execute() {
        const isDoubleSpend = this.transaction.inputUTXOs.findIndex(utxo => utxo.spent == true);
        if (isDoubleSpend !== -1) throw new Error('exist transaction that already was spend');
    }
}

module.exports = Transaction;