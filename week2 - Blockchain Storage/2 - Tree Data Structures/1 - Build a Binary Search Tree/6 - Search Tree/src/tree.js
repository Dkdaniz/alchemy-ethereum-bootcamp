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
            if(node.left === null){
                node.left = newNode
            }else{
                this.addChild(node.left, newNode)
            }
        }else{
            if(node.right == null){
                node.right = newNode
            }else{
                this.addChild(node.right, newNode)
            }
        }
    }

    searchTree(node, nodeSearch){
        if(nodeSearch === node.data){
            return true;
        }else{
            if(nodeSearch < node.data){
                if(node.left === null){
                    return false;
                }else{
                    return this.searchTree(node.left, nodeSearch)
                }
            }else{
                if(node.right == null){
                    return false;
                }else{
                    return this.searchTree(node.right, nodeSearch)
                }
            }
        }
    }

    hasNode(nodeSearch) {
        return this.searchTree(this.root, nodeSearch);
    }
}

module.exports = Tree;