"use client";
import { AdminSidebar } from "../components/AdminSidebar";

export default function AdminsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-start">
      <AdminSidebar />
      <main className="content">{children}</main>
    </div>
  );
}
