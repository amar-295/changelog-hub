import React from 'react';

/**
 * Full wordmark logo: icon + "ChangelogHub" text side-by-side.
 * Replaces the icon-only Logo.jsx for landing page use.
 */
function LogoWordmark({ size = 'md', hideTextOnMobile = false }) {
  const sizes = {
    sm: { icon: 24, text: '15px', gap: 8 },
    md: { icon: 30, text: '18px', gap: 10 },
    lg: { icon: 36, text: '22px', gap: 12 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center" style={{ gap: s.gap }}>
      <img
        src="/icon.svg"
        alt="ChangelogHub icon"
        width={s.icon}
        height={s.icon}
        style={{ objectFit: 'contain', display: 'block' }}
      />
      <span
        className={hideTextOnMobile ? 'hidden sm:block' : ''}
        style={{
          fontSize: s.text,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.92)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1,
        }}
      >
        ChangelogHub
      </span>
    </div>
  );
}

export default LogoWordmark;
