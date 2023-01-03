const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name = process.argv[2] || "Sidney Kertzmann"

  console.log(name)

  const merkleTree = new MerkleTree(niceList)
  const index = niceList.findIndex(n => n === name)
  const proof = merkleTree.getProof(index)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof
  });

  console.log({ gift });
}

main();