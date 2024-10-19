"use client";

import { WalletOptions } from "./components/ConnectWallet";
import { Account } from "./components/Account";
import { useAccount } from "wagmi";

export default function App() {
  const { isConnected } = useAccount();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isConnected ? <Account /> : <WalletOptions />}
    </div>
  );
}
