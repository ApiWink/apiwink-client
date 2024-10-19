import { Address, parseUnits } from "viem";
import { publicClient, walletClient } from "../configs/transport-clients";
import {
  AUTOSPLIT_CONTRACT_ADDRESS,
  USDC_ADDRESS,
} from "@/app/constants/addresses";
import { autoSplitContractABI } from "@/app/constants/abis/autoSplitContract";
import { erc20ABI } from "@/app/constants/abis/erc20";
import { skaleEuropaTestnet } from "viem/chains";
import { createWalletClient, createPublicClient, http } from "viem";
import { useWriteContract } from "wagmi";

export const approveToken = async (address: Address) => {
  console.log("address from useHook - approve", address);

  const walletClient = createWalletClient({
    chain: skaleEuropaTestnet,
    transport: http(),
  });

  const { writeContract } = useWriteContract();

  try {
    const request = writeContract({
      address: USDC_ADDRESS as Address,
      abi: erc20ABI,
      functionName: "approve",
      args: [AUTOSPLIT_CONTRACT_ADDRESS as Address, parseUnits("10", 6)],
      account: address as Address,
    });
    console.log("did approval work - ", request);

    return request;
  } catch (e) {
    console.log("error from approving token", e);
  }
};

export const callContract = async (address: string) => {
  console.log("address from useAccount - call contract", address);

  try {
    const request = "";
  } catch (err) {
    console.log("error from split contract", err);
  }
};
