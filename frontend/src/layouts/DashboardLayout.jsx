import React, { useState } from "react";
import Sidebar from "../pages/dashboard/Sidebar";
import Header from "../pages/dashboard/Header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Content column: header + scrollable page */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
