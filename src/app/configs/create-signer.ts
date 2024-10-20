import { ethers } from "ethers";
import { getUserByEmail, saveUserToDb } from "../hooks/useMondoDB";
import Custodian from "../signer/custodian";

export async function createSigner(email: string) {
  const userFromDb = await getUserByEmail(email);
  let _pvKey;

  if (!userFromDb) {
    //generate new wallet
    console.log("generating new wallet");
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const address = wallet.address;
    localStorage.setItem(email, privateKey);
    _pvKey = privateKey;
    const custodian = Custodian;
    try {
      console.log("distributing", address);
      const dist_tx = await custodian.distribute(address as `0x${string}`);
      console.log(dist_tx, "dist_tx");
      await saveUserToDb(email, address);
    } catch (err) {
      console.log(err, "error distributing");
    }
  } else {
    console.log("user already exists");
    _pvKey = localStorage.getItem(email);
    console.log(_pvKey, "pvKey");
  }

  const wallet = new ethers.Wallet(_pvKey as string);

  const provider = new ethers.JsonRpcProvider(
    "https://juicy-low-small-testnet-indexer.skalenodes.com:10008"
  );

  const signer = wallet.connect(provider);

  console.log(signer, "signer now finally");

  return signer;
}
