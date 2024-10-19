"use client";

import { WalletOptions } from "./components/ConnectWallet";
import { Account } from "./components/Account";
import { useAccount } from "wagmi";
import { approveToken, callContract } from "./services/contract.service";

import { Address, parseUnits } from "viem";
import {
  AUTOSPLIT_CONTRACT_ADDRESS,
  USDC_ADDRESS,
} from "@/app/constants/addresses";
import { autoSplitContractABI } from "@/app/constants/abis/autoSplitContract";
import { erc20ABI } from "@/app/constants/abis/erc20";
import { skaleEuropaTestnet } from "viem/chains";
import { useWriteContract } from "wagmi";
import { config } from "./contexts/Web3Provider";

export default function App() {
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const approveToken = async () => {
    try {
      const data = writeContractAsync({
        address: USDC_ADDRESS as Address,
        abi: erc20ABI,
        functionName: "approve",
        args: [AUTOSPLIT_CONTRACT_ADDRESS as Address, parseUnits("100000", 6)],
        account: address as Address,
      });

      console.log("did approval work - ", data);
    } catch (e) {
      console.log("error from approving token", e);
    }
  };

  const callContract = async () => {
    const data = await writeContractAsync({
      address: AUTOSPLIT_CONTRACT_ADDRESS as Address,
      abi: autoSplitContractABI,
      functionName: "autoSplitPayment",
      args: [
        USDC_ADDRESS as Address,
        parseUnits("9", 6),
        "0x7CC6E56d37eA31A31d0d59E41728bb034203C6DB",
        // "0xe00019DE7B0fBC7B8C7EAD6c0bB470Ec1bA4bA24",
        "0x0dC6103A3b7fe44Fc4De0B64fBC4EeB840cDA74b",
      ],
      account: address as Address,
    });

    console.log("did call contract work - ", data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isConnected ? <Account /> : <WalletOptions />}
      <button onClick={() => approveToken()}>Approve token</button>
      <button onClick={() => callContract()}>Call contract</button>
    </div>
  );
}
