function verifyProof(proof, node, root, concat) {
  let genaratedRoot = node;
  proof.forEach(item => {
      if(item.left) {
          genaratedRoot = concat(item.data, genaratedRoot)
      }else{
          genaratedRoot = concat(genaratedRoot, item.data)
      }
  })

  return genaratedRoot === root;
}

module.exports = verifyProof;