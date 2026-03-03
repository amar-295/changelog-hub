import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Tip({ children }) {
  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg
        text-[11px] font-semibold whitespace-nowrap text-white pointer-events-none z-50"
      style={{
        backgroundColor: 'var(--color-bg-tooltip)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
      }}
    >
      {children}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '5px solid var(--color-bg-tooltip)',
        }}
      />
    </div>
  );
}
Tip.propTypes = { children: PropTypes.node };

export function IconBtn(props) {
  const { icon: Icon, label, onClick, active = false } = props;
  const [tip, setTip] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`h-9 w-9 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
          active
            ? 'border-primary/50 text-primary bg-primary/10'
            : 'hover:bg-white/12 hover:border-white/25 text-text-primary'
        }`}
        style={{
          borderColor: active ? undefined : 'var(--color-border)',
        }}
      >
        <Icon size={15} strokeWidth={1.75} />
      </button>
      {tip && <Tip>{label}</Tip>}
    </div>
  );
}

IconBtn.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};
