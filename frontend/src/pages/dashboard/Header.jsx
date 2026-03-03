import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Menu } from 'lucide-react';
import SearchBar from './components/SearchBar';
import NotificationBell from './components/NotificationBell';
import ProfileDropdown from './components/ProfileDropdown';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/releases': 'Releases',
  '/analytics': 'Analytics',
  '/team': 'Team',
  '/settings': 'Settings',
};

function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Dashboard';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Signed out');
      navigate('/login');
    } catch {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header
      className="shrink-0 z-20 flex items-center justify-between px-4 md:px-6 py-3"
      style={{
        backgroundColor: 'var(--color-bg-sidebar)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Left: Hamburger + Page Title + Search */}
      <div className="flex items-center gap-3 md:gap-8">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-1 rounded-lg hover:bg-white/10 active:scale-95 text-text-secondary hover:text-white transition-all"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
        <h2
          className="text-[15px] font-semibold tracking-tight shrink-0 hidden sm:block"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {pageTitle}
        </h2>
        <div className="hidden lg:block">
          <SearchBar />
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-3 relative z-50">
        <div className="hidden sm:block">
          <NotificationBell />
        </div>
        <div
          className="h-5 w-px hidden sm:block"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
        <ProfileDropdown user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
