import { ethers } from "ethers";

export function createSigner() {
  const wallet = new ethers.Wallet(
    ("0x" + process.env.NEXT_PUBLIC_CUSTODIAN_PRIVATE_KEY) as string
  );

  const provider = new ethers.JsonRpcProvider(
    "https://juicy-low-small-testnet-indexer.skalenodes.com:10008"
  );

  const signer = wallet.connect(provider);

  return signer;
}
