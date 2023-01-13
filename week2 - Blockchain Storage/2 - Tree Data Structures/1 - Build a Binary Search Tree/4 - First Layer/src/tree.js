class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node){
        if(this.root == null) {
            this.root = node;
        }else{
            this.addChild(this.root, node)
        }
    }

    addChild(node, newNode){
        if(newNode.data < node.data){
            node.left = newNode
        }else{
            node.right = newNode
        }
    }
}

module.exports = Tree;