"use client";
import { Sidebar } from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function shortenAddress(address: string) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  const WalletAddressComponent = () => {
    const walletAddress = localStorage.getItem("wallet_address");
    if (!walletAddress) return null;
    return (
      <div className="absolute top-10 right-10 bg-gray-100 p-2 rounded-md text-xs">
        <div>{shortenAddress(walletAddress as string)}</div>
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
