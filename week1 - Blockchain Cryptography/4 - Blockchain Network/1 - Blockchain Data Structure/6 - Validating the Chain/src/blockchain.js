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

    isValid() {
        let chainIsValid = true;
        for (let i = 1; i < this.chain.length; i++){
            const hashBlockBefore = this.chain[i - 1].toHash().toString();
            const previousHash = this.chain[i].previousHash.toString();

            if(hashBlockBefore !== previousHash) chainIsValid = false;
        }

        return chainIsValid;
    }
}

module.exports = Blockchain;