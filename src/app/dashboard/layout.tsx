"use client";
import { Sidebar } from "../components/Sidebar";
import { getWKTBalance } from "../configs/get-wkt-balance";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function shortenAddress(address: string) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  const [wktBalance, setWKTBalance] = useState<string | null>(null);

  const fetchWKTBalance = async () => {
    const balance = await getWKTBalance();
    setWKTBalance(balance);
  };

  useEffect(() => {
    fetchWKTBalance();
  }, []);

  const WalletAddressComponent = () => {
    const walletAddress = localStorage.getItem("wallet_address");
    if (!walletAddress) return null;
    return (
      <div className="absolute top-10 right-10 bg-gray-100 p-2 rounded-md text-xs min-w-[200px] flex  items-center justify-around cursor-pointer">
        <div>{shortenAddress(walletAddress as string)}</div>
        <div>{wktBalance || "0"} WKT</div>
      </div>
    );
  };

  return (
    <div className="flex items-start justify-start">
      <Sidebar />
      <WalletAddressComponent />
      <div className="flex flex-col items-center justify-center">
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
