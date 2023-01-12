class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.transaction = { inputUTXOs, outputUTXOs}
    }
    execute() {
        const isDoubleSpend = this.transaction.inputUTXOs.findIndex(utxo => utxo.spent == true);
        if (isDoubleSpend !== -1) throw new Error('exist transaction that already was spend');

        const oldInputUTXOs = [...this.transaction.inputUTXOs]
        const oldOutputUTXOs = [...this.transaction.outputUTXOs]

        const totalInputsUTXOs = oldInputUTXOs.reduce((acc, cur) => acc + cur.amount, 0)
        const totalOutputUTXOs = oldOutputUTXOs.reduce((acc, cur) => acc + cur.amount, 0);

        if (totalInputsUTXOs < totalOutputUTXOs) throw new Error('total amount of inputs dont can be less that total amount of outputs');
    }
}

module.exports = Transaction;