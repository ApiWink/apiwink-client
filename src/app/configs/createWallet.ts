import { getUserByEmail, saveUserToDb } from "../hooks/useMondoDB";
import Custodian from "../signer/custodian";
import { ethers } from "ethers";

export const createWallet = async (email: string) => {
  const userFromDb = await getUserByEmail(email);
  let _pvKey;
  let _address;

  if (!userFromDb) {
    //generate new wallet
    console.log("generating new wallet");
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const address = wallet.address;
    localStorage.setItem(email, privateKey);
    _pvKey = privateKey;
    _address = address;
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
    _address = userFromDb.wallet_address;
    console.log(_pvKey, "pvKey");
  }

  return { pvKey: _pvKey, address: _address };
};
