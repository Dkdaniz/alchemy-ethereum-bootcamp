const Block = require('./Block');

class Blockchain {
    constructor() {
        const block = new Block('Genesis')
        this.chain = [ block ];
    }

    addBlock(block) {
        this.chain = [...this.chain, block]
    }
}

module.exports = Blockchain;