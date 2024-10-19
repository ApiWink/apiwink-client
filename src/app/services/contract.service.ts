import { Address, parseUnits } from "viem";
import { publicClient, walletClient } from "../configs/transport-clients";

export const approveToken = async () => {
  try {
    const { request: r2 } = await publicClient!.simulateContract({
      address: "" as Address,
      abi: [],
      functionName: "approve",
      args: ["", parseUnits("100000", 6)],
      account: "" as Address,
    });
    const hash2 = await walletClient.writeContract(r2);
    console.log(hash2);
    return hash2;
  } catch (e) {
    console.log(e);
  }
};

export const callContract = async () => {
  try {
    const { request } = await publicClient.simulateContract({
      address: "" as Address,
      abi: [],
      functionName: "batchTransfer",
      args: [[], [], "" as Address],
      account: "" as Address,
    });

    const hash = await walletClient.writeContract(request);
    console.log("hash", hash);
  } catch (err) {
    console.log("err");
  }
};
