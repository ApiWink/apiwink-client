import { ethers } from "ethers";
import { getUserByEmail, saveUserToDb } from "../hooks/useMondoDB";
import Custodian from "../signer/custodian";

export async function createSigner(email: string) {
  const _pvKey = localStorage.getItem(email);

  const wallet = new ethers.Wallet(_pvKey as string);

  const provider = new ethers.JsonRpcProvider(
    "https://juicy-low-small-testnet-indexer.skalenodes.com:10008"
  );

  const signer = wallet.connect(provider);

  console.log(signer, "signer now finally");

  return signer;
}
