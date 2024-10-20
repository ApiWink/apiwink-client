import { getUserByEmail, saveUserToDb } from "../hooks/useMondoDB";
import Custodian from "../signer/custodian";
import { ethers } from "ethers";
import { claimABI } from "../constants/abis/claimContract";
import { CLAIM_WKT_ADDRESS } from "../constants/addresses";
import { parseUnits } from "viem";
import { WKT_ADDRESS } from "../constants/addresses";
import { erc20ABI } from "../constants/abis/erc20";

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
    //   const dist_tx = await custodian.distribute(address as `0x${string}`);
    //   console.log(dist_tx, "dist_tx");
      await saveUserToDb(email, address);
      //deposit tokens
      const wallet = new ethers.Wallet(
        process.env.NEXT_PUBLIC_CUSTODIAN_PRIVATE_KEY as string
      );

      const provider = new ethers.JsonRpcProvider(
        "https://juicy-low-small-testnet-indexer.skalenodes.com:10008"
      );

      const signer = wallet.connect(provider);
      const claimabi = claimABI;

      try {
        const approve_contract = new ethers.Contract(
          WKT_ADDRESS,
          erc20ABI,
          signer
        );

        const approve_tx = await approve_contract.approve(
          CLAIM_WKT_ADDRESS,
          parseUnits("100000", 18)
        );
        await approve_tx.wait();
        console.log("works? approve_tx", approve_tx);
      } catch (err) {
        console.log("bg signer err", err);
      }

      try {
        const contract = new ethers.Contract(
          CLAIM_WKT_ADDRESS,
          claimabi,
          signer
        );

        const functionName = "fundsTransfer";
        const args = [
          address as `0x${string}`,
          parseUnits("1000", 18),
          WKT_ADDRESS,
        ];

        const tx = await contract[functionName](...args);
        await tx.wait();

        console.log("works? fundsTransfer", tx);
      } catch (err) {
        console.log("bg signer err", err);
      }
      //deposit tokens end
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
