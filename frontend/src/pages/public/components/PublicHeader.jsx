import React from 'react';
import PropTypes from 'prop-types';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../../components/Logo';

/**
 * Sticky top header for the public changelog page.
 */
function PublicHeader({ workspace, isAuthenticated, onSubscribeClick }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080809]/90 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#161617] border border-white/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            {workspace.logo ? (
              <img
                src={workspace.logo}
                alt={workspace.name}
                className="w-full h-full object-contain p-1.5"
                loading="eager"
                fetchPriority="high"
                width="32"
                height="32"
              />
            ) : (
              <Logo className="w-5 h-5" />
            )}
          </div>
          <span className="font-semibold text-[14px] text-white">
            {workspace.name}
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {['Updates', 'Docs', 'Support'].map((item) => (
            <button
              key={item}
              className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all active:scale-[0.98]"
            >
              {item}
            </button>
          ))}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all active:scale-[0.98]"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Subscribe CTA */}
        <button
          onClick={onSubscribeClick}
          className="flex items-center gap-2 bg-white/8 hover:bg-white/12 border border-white/10 hover:border-white/20 text-white text-[13px] font-medium px-4 py-2 rounded-full transition-all active:scale-[0.98]"
        >
          <Bell size={13} className="text-text-secondary" />
          Subscribe
        </button>
      </div>
    </header>
  );
}

PublicHeader.propTypes = {
  workspace: PropTypes.shape({
    name: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onSubscribeClick: PropTypes.func.isRequired,
};

export default PublicHeader;
