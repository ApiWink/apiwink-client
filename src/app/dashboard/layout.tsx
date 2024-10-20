"use client";
import { Sidebar } from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-start">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
}
