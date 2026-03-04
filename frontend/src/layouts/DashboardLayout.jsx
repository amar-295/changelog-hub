import React, { useState, useEffect } from 'react';
import Sidebar from '../pages/dashboard/Sidebar';
import Header from '../pages/dashboard/Header';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('changeloghub_sidebar_open');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(
      'changeloghub_sidebar_open',
      JSON.stringify(isSidebarOpen)
    );
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-page)' }}
    >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Content column: header + scrollable page */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-0 md:p-6 lg:p-8">
          <div className="max-w-[1200px] mx-auto w-full">
            <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
