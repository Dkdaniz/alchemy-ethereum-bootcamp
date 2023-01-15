const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils")

const app = express();
const cors = require("cors");

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04be4acc2afccd578b35d6573ce2884b9db56d03bdc062b3fe6882ee7c2024d97809b7a9b47b0a2c9c2e6132f31bed5d06bc66c4b08f92a7af61ccf64ab43c1617": 100,
  "042d5d1b5d430eae937151018bd5b6ee08afe09355be92f0b6314492f57640d7874c29ead00a92c56a6b1f2c8a5e5a6418c6ac836c4d701bb528713cf3d2fe7086": 50,
  "04cdbf4350a53cfc1bcf7536ada096596fca23b5a6200efcbbcf8d815b76ca9e3b12fe672a88feb8ef6392970244752bae020f33d3738b97cf19e93b5523dac860": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, signature, recovery } = req.body;

  if(!signature) res.status(404).send({ message: "signature dont was provide" });
  if(!recovery) res.status(400).send({ message: "recovery dont was provide" });

  try {
    
    const bytes = utf8ToBytes(JSON.stringify({ sender, recipient, amount }));
    const hash = keccak256(bytes);

    const sig = new Uint8Array(signature);

    const publicKey = await secp.recoverPublicKey(hash, sig, recovery);

    if(toHex(publicKey) !== sender){
      res.status(400).send({ message: "signature no is valid" });
    }

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } catch (error) {
    console.log(error.message)
  }
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
