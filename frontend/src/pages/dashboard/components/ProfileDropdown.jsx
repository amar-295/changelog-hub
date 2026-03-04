import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LogOut, Settings } from 'lucide-react';
import { useTooltip } from '../../../hooks/useTooltip';
import { useNavigate } from 'react-router-dom';

function ProfileDropdown({ user, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const avatarTooltip = useTooltip();
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const initials =
    user?.fullName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <div
      className={`profile-ring ${profileOpen ? 'active' : ''}`}
      ref={profileRef}
      onMouseEnter={avatarTooltip.showTooltip}
      onMouseLeave={avatarTooltip.hideTooltip}
      onClick={() => {
        setProfileOpen((v) => !v);
        avatarTooltip.hideAndSuppress();
      }}
      aria-label="Account menu"
    >
      <div className="profile-avatar">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName || 'User'}
            className="size-full object-cover rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ''; // Fallback to initials UI
              e.target.parentElement.innerHTML = initials;
            }}
          />
        ) : (
          initials
        )}
      </div>

      {avatarTooltip.isVisible && !profileOpen && (
        <div
          className="absolute top-full left-1/2 mt-[18px] px-2.5 py-1.5 rounded-lg
            text-[11px] font-semibold whitespace-nowrap text-white
            pointer-events-none z-50 flex items-center tooltip-visible"
          style={{
            backgroundColor: 'var(--color-bg-tooltip)',
            border: '1px solid rgba(255,255,255,0.16)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
            transform: 'translateX(-50%)',
          }}
        >
          Account
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: '5px solid var(--color-bg-tooltip)',
            }}
          />
        </div>
      )}

      {profileOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-60 rounded-xl shadow-xl overflow-hidden z-50 animate-dropdown"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex flex-col items-center gap-2 px-5 py-5">
            <div
              className="size-12 rounded-full overflow-hidden flex items-center justify-center text-white font-semibold text-base"
              style={{ background: 'var(--color-primary-dark)' }}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName || 'User'}
                  className="size-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className="text-center">
              <p
                className="text-[14px] font-semibold leading-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {user?.fullName || 'User'}
              </p>
              <p
                className="text-[12px] mt-0.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {user?.email || ''}
              </p>
            </div>
          </div>

          <div
            style={{
              height: '1px',
              backgroundColor: 'var(--color-border)',
            }}
          />

          <div className="py-1.5">
            <button
              onClick={() => {
                setProfileOpen(false);
                navigate('/dashboard/settings');
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors hover:bg-bg-card-hover text-left"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <Settings size={15} strokeWidth={1.5} />
              Settings
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors hover:bg-bg-card-hover text-left"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <LogOut size={15} strokeWidth={1.5} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ProfileDropdown.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileDropdown;
