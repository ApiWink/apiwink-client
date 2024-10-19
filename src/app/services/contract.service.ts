import { Address, parseUnits } from "viem";
import { publicClient, walletClient } from "../configs/transport-clients";
import {
  AUTOSPLIT_CONTRACT_ADDRESS,
  USDC_ADDRESS,
} from "@/app/constants/addresses";
import { autoSplitContractABI } from "@/app/constants/abis/autoSplitContract";
import { erc20ABI } from "@/app/constants/abis/erc20";
import { useAccount } from "wagmi";

export const approveToken = async () => {
  const { address } = useAccount();
  try {
    const { request: r2 } = await publicClient!.simulateContract({
      address: USDC_ADDRESS as Address,
      abi: erc20ABI,
      functionName: "approve",
      args: [AUTOSPLIT_CONTRACT_ADDRESS, parseUnits("100000", 6)],
      account: address as Address,
    });
    const hash2 = await walletClient.writeContract(r2);
    console.log(hash2);
    return hash2;
  } catch (e) {
    console.log(e);
  }
};

export const callContract = async () => {
  const { address } = useAccount();
  try {
    const { request } = await publicClient.simulateContract({
      address: AUTOSPLIT_CONTRACT_ADDRESS as Address,
      abi: autoSplitContractABI,
      functionName: "autoSplitPayment",
      args: [USDC_ADDRESS, "5", "", ""],
      account: address as Address,
    });

    const hash = await walletClient.writeContract(request);
    console.log("hash", hash);
  } catch (err) {
    console.log("err");
  }
};
