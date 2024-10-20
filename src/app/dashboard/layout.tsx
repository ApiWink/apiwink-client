"use client";
import Sidebar from './sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="content">
                {children}
            </main>

            {/* Layout CSS */}
            <style jsx>{`
        .dashboard-layout {
          display: flex;
        }

        .content {
          margin-left: 200px; /* Adjusted for the fixed sidebar width */
          padding: 20px;
          width: 100%;
        }
      `}</style>
        </div>
    );
}
