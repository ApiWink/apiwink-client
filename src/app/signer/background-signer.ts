import { WalletClient, getAddress, parseAbi, Address } from "viem";
import Custodian from "./custodian";
import { createClient, createSigner } from "../configs";
import { skaleEuropaTestnet } from "viem/chains";
import { writeContract } from "@wagmi/core";
import { config } from "../contexts/Web3Provider";
import { ethers } from "ethers";

class BackgroundSigners {
  custodian: typeof Custodian;

  constructor() {
    this.custodian = Custodian;
  }

  public async backgroundSignerAction(
    userId: string,
    args: any[],
    abi: any,
    address: Address,
    functionName: string,
    email: string
  ) {
    const signer = await createSigner(email);
    console.log(signer.address, "account from getUser");
    if (!signer.address) throw new Error("Account Not Found");

    console.log(signer.address, userId, "this.signers[userId]");

    let res;

    try {
      const contract = new ethers.Contract(address, abi, signer);

      const tx = await contract[functionName](...args);
      await tx.wait();

      console.log("works?", tx);
    } catch (err) {
      console.log("bg signer err", err);
    }
    console.log(res, "res from backgroundSignerAction");
    return res;
  }
}

export default new BackgroundSigners();
