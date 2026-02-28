import React, { useState } from "react";
import Sidebar from "../pages/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 h-screen overflow-y-auto relative">
        <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
      </main>
    </div>
  );
}

export default DashboardLayout;
