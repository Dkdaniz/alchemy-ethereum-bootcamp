const Block = require('./Block');

class Blockchain {
    constructor() {
        const block = new Block('Genesis')
        this.chain = [ block ];
    }

    addBlock(block) {
        const oldChain = [...this.chain];
        const lastBlock = oldChain.pop();

        block.previousHash = lastBlock.toHash();

        this.chain = [...this.chain, block]
    }
}

module.exports = Blockchain;