import React from 'react';
import { Bell } from 'lucide-react';
import { useTooltip } from '../../../hooks/useTooltip';

function NotificationBell() {
  const { isVisible, showTooltip, hideTooltip, hideAndSuppress } = useTooltip();

  return (
    <div
      className="relative"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <button
        onClick={() => {
          hideAndSuppress();
          // handle notification click
        }}
        className="relative p-2 rounded-lg transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Notifications"
      >
        <Bell size={17} strokeWidth={1.5} />
        <span
          className="absolute top-1.5 right-1.5 size-1.5 rounded-full"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
      </button>
      {isVisible && (
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
          Notifications
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
    </div>
  );
}

export default NotificationBell;
