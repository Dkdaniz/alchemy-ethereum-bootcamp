import { ethers } from 'ethers';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow';

export async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, { value });
}

export async function instanceEscrowContract(address, signer) {
  const escrow = new ethers.Contract(address, Escrow.abi, signer);
  return escrow
}
