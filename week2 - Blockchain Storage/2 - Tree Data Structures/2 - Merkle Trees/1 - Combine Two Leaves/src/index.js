class MerkleTree {
    constructor(leaves, concat) {
        this.root = null;
        this.leaves = leaves;
        this.hash = concat;
    }

    getRoot() {
        let arr = [...this.leaves];

        this.root = this.hash(arr[0], arr[1])

        return this.root;
    }
}

module.exports = MerkleTree;