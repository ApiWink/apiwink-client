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
import BackgroundSigners from "./signer/background-signer";
import { USDC } from "./signer/contracts";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { HeroSection } from "./components/LPComponents/HeroSection";
import { CTextReveal } from "./components/LPComponents/CTextReveal";

export default function App() {
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const bgSigner = BackgroundSigners;

  const { user } = useDynamicContext();

  const approveToken = async () => {
    if (!user?.email) return;
    try {
      const res = await bgSigner.backgroundSignerAction(
        address as string,
        [AUTOSPLIT_CONTRACT_ADDRESS as Address, parseUnits("100000", 6)],
        USDC.abi,
        USDC.address as Address,
        "approve",
        user.email
      );
      console.log("did approval work - from bg signer", res);
    } catch (e) {
      console.log("error from approving token", e);
    }
  };

  const callContract = async () => {
    if (!user?.email) return;
    console.log("calling contract");
    try {
      const res = await bgSigner.backgroundSignerAction(
        address as string,
        [
          USDC_ADDRESS as Address,
          parseUnits("8", 6),
          // "0x7CC6E56d37eA31A31d0d59E41728bb034203C6DB",
          "0xe00019DE7B0fBC7B8C7EAD6c0bB470Ec1bA4bA24",
          "0x0dC6103A3b7fe44Fc4De0B64fBC4EeB840cDA74b",
        ],
        autoSplitContractABI,
        AUTOSPLIT_CONTRACT_ADDRESS as Address,
        "autoSplitPayment",
        user.email
      );

      console.log("did call contract work - from bg signer", res);
    } catch (e) {
      console.log("error from calling contract", e);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* {isConnected ? <Account /> : <WalletOptions />}
      <button onClick={() => approveToken()}>Approve token</button>
      <button onClick={() => callContract()}>Call contract</button>
      <DynamicWidget innerButtonComponent={<h1>Log in or Sign up</h1>} /> */}
      <div className="h-screen">
        <HeroSection />
      </div>
      {/* <div className="h-screen">
        <CTextReveal />
      </div> */}
    </div>
  );
}
