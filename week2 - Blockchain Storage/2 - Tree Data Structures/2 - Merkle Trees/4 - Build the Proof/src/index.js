class MerkleTree {
    constructor(leaves, concat) {
        this.root = null;
        this.leaves = leaves;
        this.hash = concat;
    }

    getRoot() {
        let arr = [...this.leaves];

        while (arr.length !== 1) {
            arr = this.getNextLayer(arr)
        }

        this.root = arr[0];
        
        return this.root;
    }


    getNextLayer(arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i % 2 !== 0) {
                newArr.push(this.hash(arr[i - 1], arr[i]));

                if (i === arr.length - 1) {
                    arr = newArr;
                    newArr = [];
                }
            } else if (i === arr.length - 1) {
                newArr.push(arr[i]);
                arr = newArr;
                newArr = [];
            }
        }

        return arr;
    }

     getProof(index) {
        let arr = [...this.leaves];
        let newArr = [];
        const proof = [];

        while (arr.length !== 1) {
            if (index % 2 === 0) {
                if (index !== arr.length - 1) {
                    proof.push({
                        data: arr[index + 1],
                        left: false
                    })
                }
            } else {
                proof.push({
                    data: arr[index - 1],
                    left: true
                })
            }

            arr = this.getNextLayer(arr);

            index = Math.floor(index / 2)
        }

        this.root = arr[0];
        return proof;
    }
}

module.exports = MerkleTree;